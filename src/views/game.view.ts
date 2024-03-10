import { Game } from "../models/game.model";
import { create } from "../utils/create.function";
import { ModelEvent, ScriptEvent } from "../utils/events.constants";
import { ControlView } from "./control.view";
import { ScoresView } from "./scores.view";
import { ScriptView } from "./script.view";
import { EntityView } from "./entity-view.abstract";
import { MenuView } from "./menu.view";

export class GameView extends EntityView<Game> {
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

       this.entity.bind(ModelEvent.NEW_TURN, (game)=>{
           this.menuView.renderNewTurn(game.currentPlayer())
           this.controlView.updateCurrentPlayer(game.currentPlayer())
       })

        this.entity.script.bind([ScriptEvent.PLAYER_BLOCKED, ScriptEvent.PLAYER_UNBLOCKED], (script)=>{
            this.controlView.toggleEnabled(script.isPlayerEnabled)
            this.menuView.toggleEnabled(script.isPlayerEnabled)
        })
    }

    public create(){
        return create({
            tag: 'div',
            attributes: {
                id: this.id
            },
            classes: GameView.CLASSES,
            children: [
                this.scoresView.getElement(),
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