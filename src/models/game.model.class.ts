import { ModelEvent } from "../utils/events.constants";
import { Bindable } from "./bindable.abstract.class";
import { Card } from "./card.model.class";
import { Player } from "./player.model.class";
import { Script } from "./script.model.class";

export class Game extends Bindable {
    private currentPlayerIndex: number;
    
    constructor(
        private players: Player[],
        private script: Script,
        ){
            super();
            this.currentPlayerIndex = 0
        }

    public playCard(card: Card){
        this.currentPlayer().playCard(card, this.script)
        console.log(`${card.name} was played`)
    }

    public start(){
        this.newTurn()
    }

    public currentPlayer(){
        return this.players[this.currentPlayerIndex]
    }

    private newTurn(){
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.trigger(ModelEvent.NEW_TURN)
    }
    
}