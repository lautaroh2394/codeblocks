import { Card } from "../models/cards/card.abstract";
import { create } from "../utils/create.function";
import { ViewEvent } from "../utils/events.constants";
import { EntityView } from "./entity-view.abstract";

export class CardView extends EntityView<Card> {
    static CLASSES = ["card"]

    constructor(public entity: Card){
        super(entity)
    }

    create(): HTMLElement {
        return create({
            tag: 'div',
            classes: CardView.CLASSES,
            events: {
                "click": ()=>{
                    this.trigger(ViewEvent.CARD_PLAYED)
                }
            },
            children: [
                {
                    tag: 'div',
                    classes: ["card-type"],
                    textContent: this.entity.type.toString()
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