import { Player } from "../models/player.model";
import { create } from "../utils/create.function";
import { ViewEvent } from "../utils/events.constants";
import { Button } from "./buttons/button.abstract";
import { DiscardHandButton } from "./buttons/discard-hand.button";
import { EndTurnButton } from "./buttons/end-turn.button";
import { TakeCardButton } from "./buttons/take-card.button";
import { View } from "./view.abstract";

export class MenuView extends View {
    static CLASSES = ["absolute-container", "flex", "z-index-0", "flex-column"]
    private player: Player;
    private buttons: Button[]
    
    constructor(){
        super()
        this.buttons = [
            new EndTurnButton(),
            new TakeCardButton(),
            new DiscardHandButton()
        ]

        this.buttons.forEach(button =>{
            button.bind(ViewEvent.CLICK, (button) => {
                button.visitPlayer(this.player)
            })
        })
    }

    public render(
        player: Player,
        ){
        this.player = player
        return super.render()
    }

    create() {
        return create({
            tag: 'div',
            classes: MenuView.CLASSES,
            children: [
                {
                    tag: 'div',
                    attributes: {
                        id: "player-menu",
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
}