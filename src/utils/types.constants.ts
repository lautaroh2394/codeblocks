import { Game } from "../models/game.model";
import { Script } from "../models/script.model";
import { GameView } from "../views/game.view";
import { ScoresView } from "../views/scores.view";
import { ScriptView } from "../views/script.view";

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
    SENTENCE = 'SENTENCE',
    OPERATION = 'OPERATION',
    VARIABLE = 'VARIABLE'
}

export type Method = (...args : any[]) => any;
export type OptionalRecord<K extends string, V> = {
    [key in K]?: V
}