import { Player } from "../../models/player.model";
import { HTMLCreate } from "../../utils/create.function";
import { MenuView } from "../menu.view";
import { PlayerMenuButton } from "./player-menu-button.abstract";

export class TakeCardButton extends PlayerMenuButton {
    protected htmlCreate(): Omit<HTMLCreate, "events">{
        return {
            tag: "div",
            // todo - codigo repetido en discard hand button. quizás dejar la logica de la clase en la clase base (boton de finalizar buton estaría siempre activo)
            classes: ["button-menu", this.isEnabled ? 'button-menu-enabled' : 'button-menu-disabled'],
            textContent: "Robar carta"
        }
    }

    constructor(menuView: MenuView){
        super(menuView);
        this.toggleEnabled(menuView.player.canTakeCard())
    }

    protected onClick(player: Player) {
        player.takeCard()
    }
}