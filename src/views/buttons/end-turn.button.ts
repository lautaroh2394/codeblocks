import { Player } from "../../models/player.model"
import { HTMLCreate } from "../../utils/create.function"
import { PlayerMenuButton } from "./player-menu-button.abstract"

export class EndTurnButton extends PlayerMenuButton {
    protected htmlCreate(): Omit<HTMLCreate, 'events'>{
        return {
            tag: "div",
            classes: ["button-menu", "button-menu-enabled"],
            textContent: "Finalizar turno",
        }
    }

    protected onClick(player: Player) {
        player.endTurn()
    }
}