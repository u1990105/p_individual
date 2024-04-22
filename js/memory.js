export var game = function(){
    const back = '../resources/back.png';
    const resources = [
        '../resources/cb.png', 
        '../resources/cg.png', 
        '../resources/co.png',
        '../resources/cr.png',
        '../resources/cy.png',
        '../resources/tb.png', 
        '../resources/tg.png', 
        '../resources/to.png',
        '../resources/tr.png',
        '../resources/ty.png',
        '../resources/sb.png', 
        '../resources/sg.png', 
        '../resources/so.png',
        '../resources/sr.png',
        '../resources/sy.png'
    ];
    const card = {
        current: back,
        clickable: true,
        waiting: false,
        isDone: false,
        goBack: function (){
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
            }, 1000);
        },
        goFront: function (last){
            if (last)
                this.waiting = last.waiting = false;
            else
                this.waiting = true;
            this.current = this.front;
            this.clickable = false;
            this.callback();
        },
        check: function (other){
            if (this.front === other.front)
                this.isDone = other.isDone = true;
            return this.isDone;
        }
    };

    
    var options = JSON.parse(localStorage.getItem("options")||JSON.stringify(default_options));
    var lastCard;
    var pairs = options.pairs;
    var difficulty = options.difficulty
    var points = 100; //vida
    var cards = []; // Llistat de cartes
    var mix = function(){
        var items = resources.slice(); // Copiem l'array
        items.sort(() => Math.random() - 0.5); // Aleatòria
        items = items.slice(0, pairs); // Agafem els primers
        items = items.concat(items);
        return items.sort(() => Math.random() - 0.5); // Aleatòria
    }
    return {
        init: function (call){
            if (sessionStorage.save){ // Load game
                let partida = JSON.parse(sessionStorage.save);
                pairs = partida.pairs;
                points = partida.points;
                partida.cards.map(item=>{
                    let it = Object.create(card);
                    it.front = item.front;
                    it.current = item.current;
                    it.isDone = item.isDone;
                    it.waiting = item.waiting;
                    it.callback = call;
                    cards.push(it);
                    if (it.current != back && !it.waiting && !it.isDone) it.goBack();
                    else if (it.waiting) lastCard = it;
                });
                return cards;
            }
            else return mix().map(item => { // New game
                cards.push(Object.create(card, { front: {value:item}, callback: {value:call}}));
                if (sessionStorage.mode == "easy"){ // diferencia el modo de juego
                    cards.forEach(function(carta, index) {
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
                } else {
                    console.log("mode 2")
                    //aplicar la dificultar y numero de cartas gradual
                }
                
                return cards[cards.length-1];
            });
        },
        click: function (card){
            if (!card.clickable) return;
            card.goFront(lastCard);
            if (lastCard){ // Segona carta
                if (card.check(lastCard)){
                    pairs--;
                    if (pairs <= 0){
                        alert("Has guanyat amb " + points + " punts!");
                        window.location.replace("../");
                    }
                }
                else{
                    [card, lastCard].forEach(c=>c.goBack());
                    points-=25;
                    if (points <= 0){
                        alert ("Has perdut");
                        window.location.replace("../");
                    }
                }
                lastCard = null;
            }
            else lastCard = card; // Primera carta
        },
        save: function (){
            var partida = {
                uuid: localStorage.uuid,
                pairs: pairs,
                points: points,
                cards: []
            };
            cards.forEach(c=>{
                partida.cards.push({
                    current: c.current,
                    front: c.front,
                    isDone: c.isDone,
                    waiting: c.waiting
                });
            });

            let json_partida = JSON.stringify(partida);

            fetch("../php/save.php",{
                method: "POST",
                body: json_partida,
                headers: {"content-type":"application/json; charset=UTF-8"}
            })
            .then(response=>response.json())
            .then(json => {
                console.log(json);
            })
            .catch(err=>{
                console.log(err);
                localStorage.save = json_partida;
                console.log(localStorage.save);
            })
            .finally(()=>{
                window.location.replace("../");
            });
        }
    }
}();