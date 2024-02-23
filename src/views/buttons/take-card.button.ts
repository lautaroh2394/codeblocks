import { Player } from "../../models/player.model";
import { HTMLCreate } from "../../utils/create.function";
import { PlayerMenuButton } from "./player-menu-button.abstract";

export class TakeCardButton extends PlayerMenuButton {
    protected htmlCreate: Omit<HTMLCreate, "events"> = {
        tag: 'div',
        classes: ["button-menu"],
        textContent: "Robar carta"
    }

    protected onClick(player: Player) {
        player.takeCard()
    }
}