import { Game } from "../models/game.model.class";
import { create } from "../utils/create.function";
import { ControlView } from "./control.view.class";
import { ScoresView } from "./scores.view.class";
import { ScriptView } from "./script.view.class";
import { View } from "./view.abstract.class";

export class GameView extends View{
    static ID = "game-view"
    static CLASSES = [
        "game-view"
    ]

    constructor(
        private readonly game: Game,
        private readonly scriptView: ScriptView,
        private readonly controlView: ControlView,
        private readonly scoresView: ScoresView,
    ){
        super()
    }

    public render(){
        return create({
            tag: 'div',
            attributes: {
                id: GameView.ID,
            },
            classes: GameView.CLASSES,
            children: [
                this.containerForScriptAndControl(),
                this.scoresView.render(),
            ]
        })
    }

    private containerForScriptAndControl(){
        return {
            tag: 'div',
            classes: [
                "grid-container",
                "absolute-container",
                "z-index-1"
            ],
            children: [
                this.scriptView.render(),
                this.controlView.render(),
            ]
        }
    }
}