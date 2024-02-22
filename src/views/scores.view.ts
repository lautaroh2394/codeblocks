import { Player } from "../models/player.model";
import { create } from "../utils/create.function";
import { View } from "./view.abstract";

export class ScoresView extends View {
    static CLASSES = [
        "absolute-container", "flex", "z-index-0"
    ]

    constructor(private players: Player[] = []){
        super()
    }

    create(): HTMLElement {
        return create({
            tag: 'div',
            classes: ScoresView.CLASSES,
            children: this.createPlayersList()
        })
    }

    private createPlayersList(){
        return [{
            tag: 'div',
            attributes: {
                id: "players-list",

            },
            classes: ["players-list"],
            children: this.players.map(player => ({
                tag: 'div',
                classes: ["player"],
                textContent: player.name
            }))
        }]
    }
}