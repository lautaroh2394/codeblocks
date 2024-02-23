import { Sentence } from "../models/sentences/sentence.abstract";
import { create } from "../utils/create.function";
import { EntityView } from "./entity-view.abstract";

export class SentenceView extends EntityView<Sentence> {
    constructor(
        public readonly entity: Sentence,
    ){
        super(entity)
    }

    create(){
        return create({
            tag: 'div',
            classes: [ "sentence", this.entity.isExecuting ? "executing-sentence" : null ],
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