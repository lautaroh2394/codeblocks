import { Game } from "../models/game.model.class";
import { Script } from "../models/script.model.class";
import { GameView } from "../views/game.view.class";
import { ScoresView } from "../views/scores.view.class";
import { ScriptView } from "../views/script.view.class";

declare global {
    interface Window {
      gameView: GameView,
      scriptView: ScriptView,
      scoresView: ScoresView,
      script: Script,
      game: Game,
    }
  }

export enum CardType {
    SENTENCE,
    OPERACION,
    VARIABLE
}

export type Method = (...args : any[]) => any;
export type OptionalRecord<K extends string, V> = {
    [key in K]?: V
}