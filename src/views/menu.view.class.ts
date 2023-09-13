import { Player } from "../models/player.model.class";
import { create } from "../utils/create.function";
import { ViewEvent } from "../utils/events.constants";
import { View } from "./view.abstract.class";

export class MenuView extends View {
    static CLASSES = ["absolute-container", "flex","z-index-0","flex-column"]
    private player: Player;

    public render(player: Player){
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
                        {
                            tag: 'div',
                            classes: ["button-menu"],
                            textContent: "Finalizar turno",
                            events: {
                                "click": ()=>{
                                    this.trigger(ViewEvent.CLICK)
                                }
                            }
                        },
                        {
                            tag: 'div',
                            classes: ["button-menu"]
                            ,
                            textContent: "Robar carta"
                        },
                        {
                            tag: 'div',
                            classes: ["button-menu"],
                            textContent: "Descartar mano"
                        },
                    ]
                }
            ]
        })
    }
}