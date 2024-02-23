import { Player } from "../../models/player.model";
import { HTMLCreate } from "../../utils/create.function";
import { PlayerMenuButton } from "./player-menu-button.abstract"

export class DiscardHandButton extends PlayerMenuButton{
    protected htmlCreate: Omit<HTMLCreate, "events"> = {
        tag: 'div',
        classes: ["button-menu"],
        textContent: "Descartar mano"
    }

    protected onClick(player: Player) {
        player.discardHand()
        for (let _ of new Array(5)){
            player.takeCard()
        }
    }
}