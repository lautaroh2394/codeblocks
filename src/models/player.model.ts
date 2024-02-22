import { Bindable } from "./bindable.abstract";
import { Card } from "./cards/card.abstract";
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

    public removeCard(card){
        this.cards = this.cards.filter(playerCard => playerCard.name != card.name)
    }
}