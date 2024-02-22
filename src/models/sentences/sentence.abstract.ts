import { SentenceEvents } from "../../utils/events.constants";
import { Bindable } from "../bindable.abstract";
import { Variable } from "../variable.model";

export abstract class Sentence extends Bindable<SentenceEvents>{
    public assignedTo: Variable;

    constructor(
        public id: number,
        public name: string,
        public methodDescription: string,
        ){
        super()
    }
    
    public execute(){
        this.trigger(SentenceEvents.STARTED_EXECUTION)
        this.executeLogic()
        this.trigger(SentenceEvents.FINISHED_EXECUTION)
    }

    protected abstract executeLogic()
}