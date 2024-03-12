import { Player } from "../models/player.model";
import { create } from "../utils/create.function";
import { PlayerMenuButton } from "./buttons/player-menu-button.abstract";
import { DiscardHandButton } from "./buttons/discard-hand.button";
import { EndTurnButton } from "./buttons/end-turn.button";
import { TakeCardButton } from "./buttons/take-card.button";
import { View } from "./view.abstract";
import { ViewEvent } from "../utils/events.constants";

export class MenuView extends View {
    static CLASSES = ["absolute-container", "flex", "z-index-0", "flex-column"]

    public player: Player;
    private buttons: PlayerMenuButton[]
    
    constructor(){
        super()
    }


    public renderNewTurn(
        player: Player,
        ){
        this.player = player
        return this.render()
    }

    public render(){
        this.refreshButtons()
        return super.render()
    }

    create() {
        return create({
            tag: 'div',
            attributes: {
                id: this.id,
            },
            classes: MenuView.CLASSES,
            children: [
                {
                    tag: 'div',
                    attributes: {
                        id: this.id
                    },
                    classes: ["player-menu", "brown"],
                    children: [
                        {
                            tag: 'div',
                            classes: ["current-player-name"],
                            textContent: this.player.name
                        },
                        ...this.buttons
                    ]
                }
            ]
        })
    }

    public trigger(...args){
        if (this.isEnabled){
            super.trigger.apply(this, args as [ViewEvent, any])
        }
    }

    private refreshButtons(){
        this.buttons = [
            EndTurnButton,
            TakeCardButton,
            DiscardHandButton
        ].map(ButtonClass => new ButtonClass(this))
    }
}