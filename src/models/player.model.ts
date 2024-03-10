import { ModelEvent } from "../utils/events.constants";
import { Bindable } from "./bindable.abstract";
import { Card } from "./cards/card.abstract";
import { Deck } from "./deck.model";
import { Script } from "./script.model";

export class Player extends Bindable{
    private hasDiscardedThisTurn: boolean = false;
    private amountOfCardsTakenThisTurn: number = 0;

    constructor(
        public name: string,
        public script: Script,
        public cards: Card[] = [],
        ){
        super()
    }

    public playCard(card: Card){
        card.beInvokedBy(this, this.script)
    }

    public removeCardById(cardId: number){
        this.cards = this.cards.filter(playerCard => playerCard.id != cardId)
    }

    public takeCard(){
        if (this.isAllowedToTakeCard()){
            this.cards.push(Deck.takeCard())
            this.amountOfCardsTakenThisTurn++
            this.trigger(ModelEvent.UPDATED)
        }
    }

    public discardHand(){
        if (this.isAllowedToDiscard()){
            Deck.discard(this.cards)
            this.cards = []
            this.hasDiscardedThisTurn = true
            for (let _ of new Array(4)){
                this.takeCard()
            }
            this.amountOfCardsTakenThisTurn = 99 // Should not be able to take cards after discarding
            this.trigger(ModelEvent.UPDATED)
        }
    }

    public startTurn(){
        this.amountOfCardsTakenThisTurn = 0;
        this.hasDiscardedThisTurn = false;
        this.trigger(ModelEvent.NEW_TURN)
    }

    public endTurn(){
        this.trigger(ModelEvent.END_TURN)
    }

    public isAllowedToDiscard(){
        return !this.hasDiscardedThisTurn && this.amountOfCardsTakenThisTurn == 0
    }

    public isAllowedToTakeCard(){
        if (this.amountOfCardsTakenThisTurn == 0) return true
        return (this.amountOfCardsTakenThisTurn < 6 && this.cards.length < 6)
    }
}