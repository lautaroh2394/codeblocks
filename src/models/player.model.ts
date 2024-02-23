import { ModelEvent } from "../utils/events.constants";
import { Bindable } from "./bindable.abstract";
import { Card } from "./cards/card.abstract";
import { Deck } from "./deck.model";
import { Script } from "./script.model";

export class Player extends Bindable{

    constructor(
        public name: string,
        public script: Script,
        public cards: Card[] = [],
        ){
        super()
    }

    public playCard(card: Card){
        card.beInvokedBy(this, this.script) // Should the card know the script by itself?
    }

    public removeCardById(cardId: number){
        this.cards = this.cards.filter(playerCard => playerCard.id != cardId)
    }

    public takeCard(){
        if (this.cards.length > 5) return
        this.cards.push(Deck.takeCard())
        this.trigger(ModelEvent.UPDATED)
    }

    public discardHand(){
        Deck.discard(this.cards)
        this.cards = []
        this.trigger(ModelEvent.UPDATED)
    }

    public endTurn(){
        this.trigger(ModelEvent.END_TURN)
    }
}