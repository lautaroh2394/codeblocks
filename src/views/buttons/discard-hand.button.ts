import { Player } from "../../models/player.model";
import { HTMLCreate } from "../../utils/create.function";
import { Button } from "./button.abstract"

export class DiscardHandButton extends Button{
    protected htmlCreate: Omit<HTMLCreate, "events"> = {
        tag: 'div',
        classes: ["button-menu"],
        textContent: "Descartar mano"
    }

    protected visitPlayer(player: Player) {
        player.discardHand()
        for (let _ of new Array(5)){
            player.takeCard()
        }
    }
}