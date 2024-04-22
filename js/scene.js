import { game as gController } from "./memory.js";

export class PlayScene extends Phaser.Scene{
    constructor (){
        super('PlayScene');
        this.resources = [];
        this.cards = gController.init(()=>null); // Inicialitzar cartes
    }

    preload() {  
        this.cards.forEach((r)=>{
            if (!this.resources.includes(r.front))
                this.resources.push(r.front);
        });
        this.resources.push("../resources/back.png");
        this.resources.forEach((r)=>this.load.image(r,r)); // Primer paràmetre nom Segon paràmetre direcció
    }

    create() {
        this.cameras.main.setBackgroundColor(0xBFFCFF);
        var offset_x = 300;
        var x = (this.game.config.width-(offset_x*2)) / 100;
        this.g_cards = this.physics.add.staticGroup();
       
        this.cards.forEach((c, i)=>{ 
            //tanto en el modo uno como en el dos hay tres cosas en el modo uno es statico mientras en el modo 2 es incremental, hay tres cosas la puntuacion
            //para cuando se haga el ranking pedir nombre de usaurio al iniciar partida en el modo 2 el ranking solo se bassa en el modo2 NO en el 1
            //tanto en el modo 1 o 2 no se requerie que se muestere la puntacion ni nada solo el canvan.
            //FALTA: arreglar el problema decimal del mostreo de cartas
            //partidas: solo tiene que pillar la ultima partida, siempre estara guardando en el local storage, entonces hay que cambiar el boton de partidas por un boton tipo "carrgar ultima partida", si no hay ninguna partida muestra alerta y redirige a menu y si hay redirige al canvas supongo y empieza la partida
            // el ranking de partidas, es solo texto a mostrar no se utiliza nada del canvas.
            
            this.g_cards.create(offset_x + (Math.trunc(i%x))*100, 90 + (Math.trunc(i/x)) * 150, c.current)
        });

        this.g_cards.children.iterate((c, i) => {
            c.setInteractive();
            c.on('pointerup', ()=> gController.click(this.cards[i]));
        });
    }

    update() {
        this.g_cards.children.iterate((c, i) => c.setTexture(this.cards[i].current));
    }
}