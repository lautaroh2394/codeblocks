import { SentenceEvent } from "../../utils/events.constants";
import { Bindable } from "../bindable.abstract";
import { Variable } from "../variable.model";

export abstract class Sentence extends Bindable<SentenceEvent>{
    public assignedTo: Variable;
    public isExecuting: boolean = false;

    constructor(
        public id: number,
        public name: string,
        public methodDescription: string,
        ){
        super()

        this.bind(SentenceEvent.STARTED_EXECUTION, ()=> {
            this.isExecuting = true
            this.trigger(SentenceEvent.SCROLL_TO_SENTENCE, this)
        })
        this.bind(SentenceEvent.FINISHED_EXECUTION, ()=> this.isExecuting = false)
    }
    
    public execute(){
        this.trigger(SentenceEvent.STARTED_EXECUTION)
        this.executeLogic()
        this.trigger(SentenceEvent.FINISHED_EXECUTION)
    }

    public executeIn(milliseconds: number = 0){
        this.trigger(SentenceEvent.STARTED_EXECUTION)
        setTimeout(()=>{
            this.executeLogic()
            this.trigger(SentenceEvent.FINISHED_EXECUTION)
        }, milliseconds)
    }

    protected abstract executeLogic()
}