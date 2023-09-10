import { Player } from "../models/player.model.class";
import { View } from "./view.abstract.class";

export class ControlView extends View {
    constructor(
        public player: Player,
    ){
        super()
    }
    
    public render(): HTMLElement {
        return new HTMLElement()
    }
}