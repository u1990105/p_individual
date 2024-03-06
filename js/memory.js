export var game = function(){
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png', '../resources/sb.png','../resources/so.png', '../resources/tb.png','../resources/to.png'];
    const card = {
        current: back,
        clickable: true,
        goBack: function (){
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
            }, 1000);
        },
        goFront: function (){
            this.current = this.front;
            this.clickable = false;
            this.callback();
        }
    };
    
    var options = JSON.parse(localStorage.getItem("options")||JSON.stringify(default_options));
    var lastCard;
    var pairs = options.pairs;
    var difficulty = options.difficulty
    var points = 100;

    return {
        init: function (call){
            var items = resources.slice(); // Copiem l'array
            items.sort(() => Math.random() - 0.5); // Aleatòria
            items = items.slice(0, pairs); // Agafem els primers
            items = items.concat(items);
            items.sort(() => Math.random() - 0.5); // Aleatòria
            var cartas = items.map(item => Object.create(card, {front: {value:item}, callback: {value:call}}));
            cartas.forEach(function(carta, index) {
                carta.current = carta.front;
                carta.clickable = false; 
                var tiempo
                if (difficulty == "easy"){
                    tiempo = 3500
                } else if (difficulty == "normal"){
                    tiempo = 2500
                }else{
                    tiempo = 1000
                }
                setTimeout(() => {
                    carta.current = back;
                    carta.clickable = true; 
                    carta.callback();
                }, tiempo);
            });

           

            return cartas;
        },
        click: function (card){
            if (!card.clickable) return;
            card.goFront();
            if (lastCard){ // Segona carta
                if (card.front === lastCard.front){
                    pairs--;
                    if (pairs <= 0){
                        alert("Has guanyat amb " + points + " punts!");
                        window.location.replace("../");
                    }
                }
                else{
                    [card, lastCard].forEach(c=>c.goBack());
                    if (difficulty == "easy"){
                        points-=15;
                    } else if (difficulty == "normal"){
                        points-=25;
                    }else{
                        points-=50;
                    }
                    if (points <= 0){
                        alert ("Has perdut");
                        window.location.replace("../");
                    }
                }
                lastCard = null;
            }
            else lastCard = card; // Primera carta
        }
    }
}();