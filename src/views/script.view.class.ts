import { Script } from "../models/script.model.class";
import { View } from "./view.abstract.class";

export class ScriptView extends View {
    constructor(
        private readonly script: Script,
    ){
        super()
    }

    public render(): HTMLElement {
        return new HTMLElement()
    }
}