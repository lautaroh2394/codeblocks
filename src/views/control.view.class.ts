import { Player } from "../models/player.model.class";
import { create } from "../utils/create.function";
import { CardView } from "./card.view.class";
import { View } from "./view.abstract.class";

export class ControlView extends View {
    static CLASSES = ["control-view", "blue"]
    static CARD_CLASSES = ["card"]

    constructor(
        public player: Player,
    ){
        super()
    }
    
    public render(): HTMLElement {
        return create({
            tag: 'div',
            classes: ControlView.CLASSES,
            children: this.renderPlayerCards()
        })
    }

    private renderPlayerCards(){
        return this.player.cards.map(card => {
            return (new CardView(card)).render()
        })
    }
}