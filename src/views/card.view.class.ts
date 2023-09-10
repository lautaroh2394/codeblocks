import { Card } from "../models/card.model.class";
import { create } from "../utils/create.function";
import { View } from "./view.abstract.class";

export class CardView extends View {
    static CLASSES = ["card"]

    constructor(protected entity:Card){
        super()
    }

    render(): HTMLElement {
        return create({
            tag: 'div',
            classes: CardView.CLASSES,
            children: [
                {
                    tag: 'div',
                    classes: ["card-type"],
                    textContent: this.entity.type
                },
                {
                    tag: 'div',
                    classes: ["card-name"],
                    textContent: this.entity.name
                },
                {
                    tag: 'div',
                    classes: ["card-description"],
                    textContent: this.entity.description
                }
            ]
        })
    }

}