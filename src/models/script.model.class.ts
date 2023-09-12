import { ModelEvent } from "../utils/events.constants";
import { Bindable } from "./bindable.abstract.class";
import { Sentence } from "./sentence.model.class";

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
}