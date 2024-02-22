import { Game } from "../models/game.model";
import { create } from "../utils/create.function";
import { ModelEvent, ViewEvent } from "../utils/events.constants";
import { ControlView } from "./control.view";
import { ScoresView } from "./scores.view";
import { ScriptView } from "./script.view";
import { EntityView } from "./entity-view.abstract";
import { MenuView } from "./menu.view";

export class GameView extends EntityView<Game> {
    static ID = "game-view"
    static CLASSES = [
        "game-view"
    ]

    public readonly scriptView: ScriptView
    public readonly controlView: ControlView
    public readonly scoresView: ScoresView
    public readonly menuView: MenuView

    constructor(
        public readonly entity: Game,
        scriptView?: ScriptView,
        controlView?: ControlView,
        scoresView?: ScoresView,
        menuView?: MenuView
    ){
        super(entity)
        this.scriptView = scriptView || new ScriptView(entity.script)
        this.controlView = controlView || new ControlView(entity.players)
        this.scoresView = scoresView || new ScoresView(entity.players)
        this.menuView = menuView || new MenuView()

        this.menuView.bind(ViewEvent.CLICK, ()=>{
            this.entity.newTurn()
        })

        this.controlView.bind(ViewEvent.RENDER, (controlView: ControlView) => {
            // TODO: views should re render themselves
            const controlViewHTMLElement = document.getElementById(ControlView.HTML_ELEMENT_ID)
            if (!controlViewHTMLElement) return;
            const parentElement = controlViewHTMLElement?.parentElement;
            controlViewHTMLElement.parentElement.removeChild(controlViewHTMLElement)
            parentElement.appendChild(controlView.getElement())
        })
        this.scriptView.bind(ViewEvent.RENDER, (scriptView: ScriptView) => {
            // TODO: views should re render themselves
            const scriptHTMLElement = document.getElementById(ScriptView.HTML_ELEMENT_ID)
            if (!scriptHTMLElement) return
            scriptHTMLElement.outerHTML = scriptView.getElement().outerHTML
        })
        entity.bind(ModelEvent.NEW_TURN, (game) => {
            this.controlView.updateCurrentPlayer(game.currentPlayer())
        })
    }

    public create(){
        return create({
            tag: 'div',
            attributes: {
                id: GameView.ID,
            },
            classes: GameView.CLASSES,
            children: [
                this.scoresView.render(),
                this.containerForScriptAndControl(),
                this.menuView.render(this.entity.currentPlayer())
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
                this.scriptView.getElement(),
                this.controlView.getElement(),
            ]
        }
    }
}