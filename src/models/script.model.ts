import { ModelEvent, ScriptEvent, SentenceEvent } from "../utils/events.constants";
import { Bindable } from "./bindable.abstract";
import { Sentence } from "./sentences/sentence.abstract";

export class Script extends Bindable{
    public sentences: Sentence[]
    private playerIsBlocked: boolean = false;

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
        this.blockPlayer()
        this.sentences.forEach((sentence, i) => {
            setTimeout(()=>{
                sentence.executeIn(400)
            }, i * 400)
        })
        setTimeout(()=>{
            this.unblockPlayer()
        }, 400 * this.sentences.length)
    }

    public getNextId(){
        return this.sentences.length + 1
    }

    public get isPlayerEnabled (){ 
        return !this.playerIsBlocked
    }

    private blockPlayer(){
        this.playerIsBlocked = true
        this.trigger(ScriptEvent.PLAYER_BLOCKED)
    }

    private unblockPlayer(){
        this.playerIsBlocked = false
        this.trigger(ScriptEvent.PLAYER_UNBLOCKED)
    }

    private listenTo(sentence){
        // TODO - FIX: It's triggering SentenceEvent! Think about how to improve this. Should there exist ModelEvent.SCROLL_TO_SENTENCE? (Doesnt make sense)
        sentence.bind(SentenceEvent.SCROLL_TO_SENTENCE, (sentence) => {
            this.trigger(SentenceEvent.SCROLL_TO_SENTENCE, sentence)
        })
    }
}