import { Card } from "./card.model.class";

export class Player {

    constructor(
        public name: string,
        public cards: Card[] = [],
        ){

    }
}