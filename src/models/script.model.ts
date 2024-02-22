import { ModelEvent } from "../utils/events.constants";
import { Bindable } from "./bindable.abstract";
import { Sentence } from "./sentences/sentence.abstract";

export class Script extends Bindable{
    public sentences: Sentence[]

    constructor(sentences : Sentence[] = []){
        super()
        this.sentences = sentences
    }

    public appendSentence(sentence: Sentence){
        this.sentences.push(sentence)
        this.trigger(ModelEvent.UPDATED)
    }

    public execute(){
        for (let sentence of this.sentences){
            sentence.execute()
        }
    }

    public getNextId(){
        return this.sentences.length + 1
    }
}