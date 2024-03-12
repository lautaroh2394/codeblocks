import { Player } from "../../models/player.model";
import { HTMLCreate } from "../../utils/create.function";
import { MenuView } from "../menu.view";
import { PlayerMenuButton } from "./player-menu-button.abstract"

export class DiscardHandButton extends PlayerMenuButton{
    protected htmlCreate(): Omit<HTMLCreate, "events">{
        return {
        tag: "div",
        classes: ["button-menu", this.isEnabled ? "button-menu-enabled" : "button-menu-disabled"],
        textContent: "Descartar mano"
    }}

    constructor(menuView: MenuView){
        super(menuView);
        this.toggleEnabled(menuView.player.canDiscard())
    }

    protected onClick(player: Player) {
        player.discardHand()
    }
}