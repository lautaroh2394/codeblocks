import { ExampleSentence } from "../sentences/example-sentence.model";
import { Card } from "./card.abstract";

export class ExampleCard extends Card {
    protected createSentence(id: number){
        return new ExampleSentence(id)
    }
}