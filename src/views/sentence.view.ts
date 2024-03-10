import { Sentence } from "../models/sentences/sentence.abstract";
import { create } from "../utils/create.function";
import { SentenceEvent } from "../utils/events.constants";
import { EntityView } from "./entity-view.abstract";

export class SentenceView extends EntityView<Sentence> {

    static IdFor(sentenceId: number){
        return `sentence-view-${sentenceId}`
    }

    constructor(
        public readonly entity: Sentence,
    ){
        super(entity)
        this.id = SentenceView.IdFor(entity.id);
        entity.bind([
            SentenceEvent.STARTED_EXECUTION,
            SentenceEvent.FINISHED_EXECUTION
        ], (_sentence)=>{
            this.render()
        })
    }

    create(){
        return create({
            tag: 'div',
            classes: [ "sentence", this.entity.isExecuting ? "executing-sentence" : null ],
            attributes: {
                id: this.id
            },
            children: [
                {
                    tag: 'div',
                    classes: ['variable'],
                    textContent: this.entity.assignedTo?.name,
                },
                {
                    tag: 'div',
                    classes: ['sentence-method'],
                    attributes: { id: `sentence-${this.entity.id}`},
                    textContent: `${this.entity.id} ${this.entity.methodDescription}`,
                }
            ]
        })
    }
}