import { Script } from "../models/script.model";
import { create } from "../utils/create.function";
import { SentenceEvent } from "../utils/events.constants";
import { EntityView } from "./entity-view.abstract";
import { SentenceView } from "./sentence.view";

export class ScriptView extends EntityView<Script> {
    static CLASSES = ["script-view"]
    static SCRIPT_CONTAINER_CLASSES = ["script-container"]

    constructor(
        public readonly entity: Script,
    ){
        super(entity)
        this.entity.bind(SentenceEvent.SCROLL_TO_SENTENCE, (sentence)=>{
            const sentenceView = document.querySelector(`#${SentenceView.IdFor(sentence.id)}`)
            sentenceView.scrollIntoView()
        })
    }

    public create(): HTMLElement {
        return create({
            tag: 'div',
            classes: ScriptView.SCRIPT_CONTAINER_CLASSES,
            attributes: {
                id: this.id
            },
            children: [
                {
                    tag: 'div',
                    classes: ScriptView.CLASSES,
                    attributes: {
                        id: this.id
                    },
                    children: this.createSentencesViews(),
                }
            ]
        })
    }

    private createSentencesViews(){
        return this.entity.sentences.map(sentence =>{
            return new SentenceView(sentence)
        })
    }
}