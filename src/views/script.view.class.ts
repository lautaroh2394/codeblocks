import { Script } from "../models/script.model.class";
import { create } from "../utils/create.function";
import { EntityView } from "./entity-view.abstract.class";

export class ScriptView extends EntityView {
    static CLASSES = ["script-view"]
    static SCRIPT_CONTAINER_CLASSES = ["script-container"]
    static HTML_ELEMENT_ID = "script-view";

    constructor(
        public readonly entity: Script,
    ){
        super(entity)
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
            return create({
                tag: 'div',
                classes: ["sentence"],
                children: [
                    {
                        tag: 'div',
                        classes: ['variable'],
                        textContent: sentence.assignedTo?.name,
                    },
                    {
                        tag: 'div',
                        classes: ['sentence-method'],
                        textContent: sentence.methodDescription,
                    }
                ]
            })
        })
    }
}