import { ModelEvent } from "../utils/events.constants";
import { Bindable } from "./bindable.abstract";
import { Card } from "./cards/card.abstract";
import { Player } from "./player.model";
import { Script } from "./script.model";

export class Game extends Bindable {
    public script: Script;
    private currentPlayerIndex: number;
    
    constructor(
        public players: Player[],
        script: Script,
        ){
            super();
            this.script = script || new Script()
            this.currentPlayerIndex = 0
            players.forEach(player =>{
                player.bind(ModelEvent.END_TURN, ()=> this.newTurn())
                player.bind(ModelEvent.UPDATED, ()=> this.trigger(ModelEvent.UPDATED))
            })
        }

    public playCard(card: Card){
        this.currentPlayer().playCard(card)
        console.log(`${card.name} was played`)
    }

    public start(){
        this.newTurn()
    }

    public currentPlayer(){
        return this.players[this.currentPlayerIndex]
    }

    public newTurn(){
        let newCurrentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        if (newCurrentPlayerIndex == 0){
            this.script.execute()
        }
        this.currentPlayerIndex = newCurrentPlayerIndex
        this.currentPlayer().startTurn()
        this.trigger(ModelEvent.NEW_TURN)
    }
    
}