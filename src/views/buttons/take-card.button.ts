import { Player } from "../../models/player.model";
import { HTMLCreate } from "../../utils/create.function";
import { Button } from "./button.abstract";

export class TakeCardButton extends Button {
    protected htmlCreate: Omit<HTMLCreate, "events"> = {
        tag: 'div',
        classes: ["button-menu"],
        textContent: "Robar carta"
    }

    protected visitPlayer(player: Player) {
        player.takeCard()
    }
}