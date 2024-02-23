import { CardType } from "../utils/types.constants";
import { Card } from "./cards/card.abstract";
import { ExampleCard } from "./cards/example-card.model";

export class Deck {
    static _instance: Deck
    constructor(
        public discarded: Card[] = []
    ){}

    static takeCard(){
        return Deck.instance.takeCard()
    }

    static discard(cards: Card[]){
        return Deck.instance.discard(cards)
    }

    static get instance(){
        if (Deck._instance) return Deck._instance
        Deck._instance = new Deck()
        return Deck._instance
    }

    public takeCard(){
        //TODO - Improve
        return new ExampleCard(CardType.SENTENCE, 'Carta del Mazo', 'Carta sacada del mazo')
    }

    public discard(cards: Card[]){
        this.discarded.push(...cards)
    }
}