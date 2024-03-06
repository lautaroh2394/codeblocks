import { ModelEvent, SentenceEvent } from "../utils/events.constants";
import { Bindable } from "./bindable.abstract";
import { Sentence } from "./sentences/sentence.abstract";

export class Script extends Bindable{
    public sentences: Sentence[]

    constructor(sentences : Sentence[] = []){
        super()
        this.sentences = sentences
        this.sentences.forEach(sentence => {
            this.listenTo(sentence)
        })
    }

    public appendSentence(sentence: Sentence){
        this.sentences.push(sentence)
        this.listenTo(sentence)
        this.trigger(ModelEvent.UPDATED)
    }

    public execute(){
        this.sentences.forEach((sentence, i) => {
            // TODO - Should block player from playing (or control view should know it)
            setTimeout(()=>{
                sentence.executeIn(400)
            }, i * 400)
        })
    }

    public getNextId(){
        return this.sentences.length + 1
    }

    private listenTo(sentence){
        /*
        sentence.bind(SentenceEvent.STARTED_EXECUTION, () => {
            this.trigger(ModelEvent.UPDATED)
        })
        sentence.bind(SentenceEvent.FINISHED_EXECUTION, () => {
            this.trigger(ModelEvent.UPDATED)
        })
        */
        // TODO - FIX: It's triggering SentenceEvent! Think about how to improve this. Should there exist ModelEvent.SCROLL_TO_SENTENCE? (Doesnt make sense)
        sentence.bind(SentenceEvent.SCROLL_TO_SENTENCE, (sentence) => {
            this.trigger(SentenceEvent.SCROLL_TO_SENTENCE, sentence)
        })
    }
}