import { Bindable } from "./bindable.abstract.class";
import { Card } from "./card.model.class";
import { Script } from "./script.model.class";

export class Player extends Bindable{

    constructor(
        public name: string,
        public cards: Card[] = [],
        ){
        super()
    }

    public playCard(card: Card, script: Script){
        card.invoke(this, script)
    }

    public removeCard(card){
        this.cards = this.cards.filter(playerCard => playerCard.name != card.name)
    }
}