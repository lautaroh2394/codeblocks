import { Script } from "../models/script.model";
import { create } from "../utils/create.function";
import { /*ModelEvent*/ SentenceEvent } from "../utils/events.constants";
import { EntityView } from "./entity-view.abstract";
import { SentenceView } from "./sentence.view";

export class ScriptView extends EntityView<Script> {
    static CLASSES = ["script-view"]
    static SCRIPT_CONTAINER_CLASSES = ["script-container"]
    static HTML_ELEMENT_ID = "script-view";

    constructor(
        public readonly entity: Script,
    ){
        super(entity)
        this.entity.bind(SentenceEvent.SCROLL_TO_SENTENCE, (sentence)=>{
            // TODO - should be this.getElement() but due to how it's rerendered it is outdated and doesnt point to an element currently in the page
            const sentenceView = document.querySelector(`#sentence-${sentence.id}`)
            sentenceView.scrollIntoView()
        })
    }

    public create(): HTMLElement {
        return create({
            tag: 'div',
            classes: ScriptView.SCRIPT_CONTAINER_CLASSES,
            children: [
                {
                    tag: 'div',
                    classes: ScriptView.CLASSES,
                    attributes: {
                        id: ScriptView.HTML_ELEMENT_ID
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