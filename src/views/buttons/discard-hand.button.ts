import { Player } from "../../models/player.model";
import { HTMLCreate } from "../../utils/create.function";
import { PlayerMenuButton } from "./player-menu-button.abstract"

export class DiscardHandButton extends PlayerMenuButton{
    protected htmlCreate(): Omit<HTMLCreate, "events">{
        return {
        tag: "div",
        classes: ["button-menu", this.isEnabled ? "button-menu-enabled" : "button-menu-disabled"],
        textContent: "Descartar mano"
    }}

    protected onClick(player: Player) {
        if (player.isAllowedToDiscard()) {
            player.discardHand()
            if (!player.isAllowedToDiscard()){
                this.toggleEnabled(false)
                this.render()
            }
            player.endTurn()
        }

    }
}