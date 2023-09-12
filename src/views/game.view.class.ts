import { Game } from "../models/game.model.class";
import { create } from "../utils/create.function";
import { ModelEvent, ViewEvent } from "../utils/events.constants";
import { ControlView } from "./control.view.class";
import { ScoresView } from "./scores.view.class";
import { ScriptView } from "./script.view.class";
import { EntityView } from "./entity-view.abstract.class";
import { CardView } from "./card.view.class";

export class GameView extends EntityView {
    static ID = "game-view"
    static CLASSES = [
        "game-view"
    ]

    constructor(
        public readonly entity: Game,
        private readonly scriptView: ScriptView,
        private readonly controlView: ControlView,
        private readonly scoresView: ScoresView,
    ){
        super(entity)
        controlView.bind(ViewEvent.CARD_PLAYED, (cardView: CardView) => this.entity.playCard(cardView.entity))
        controlView.bind(ViewEvent.RENDER, (controlView: ControlView) => {
            const controlViewHTMLElement = document.getElementById(ControlView.HTML_ELEMENT_ID)
            if (!controlViewHTMLElement) return;
            const parentElement = controlViewHTMLElement?.parentElement;
            controlViewHTMLElement.parentElement.removeChild(controlViewHTMLElement)
            parentElement.appendChild(controlView.getElement())
        })
        scriptView.bind(ViewEvent.RENDER, (scriptView: ScriptView) => {
            const scriptHTMLElement = document.getElementById(ScriptView.HTML_ELEMENT_ID)
            if (!scriptHTMLElement) return
            scriptHTMLElement.outerHTML = scriptView.getElement().outerHTML
        })
        entity.bind(ModelEvent.NEW_TURN, (game) => {
            controlView.updateCurrentPlayer(game.currentPlayer())
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
                this.scriptView.getElement(),
                this.controlView.getElement(),
            ]
        }
    }
}