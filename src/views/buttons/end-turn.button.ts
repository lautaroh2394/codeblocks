import { Player } from "../../models/player.model"
import { HTMLCreate } from "../../utils/create.function"
import { Button } from "./button.abstract"

export class EndTurnButton extends Button {
    protected htmlCreate: Omit<HTMLCreate, 'events'> = {
        tag: 'div',
        classes: ["button-menu"],
        textContent: "Finalizar turno",
    }

    protected visitPlayer(player: Player) {
        player.endTurn()
    }
}