import { Script } from "../models/script.model.class";
import { create } from "../utils/create.function";
import { View } from "./view.abstract.class";

export class ScriptView extends View {
    static CLASSES = ["script-view"]
    static SCRIPT_CONTAINER_CLASSES = ["script-container"]

    constructor(
        protected readonly entity: Script,
    ){
        super()
    }

    public render(): HTMLElement {
        return create({
            tag: 'div',
            classes: ScriptView.SCRIPT_CONTAINER_CLASSES,
            children: [
                {
                    tag: 'div',
                    classes: ScriptView.CLASSES,
                    attributes: {
                        id: "script-view"
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