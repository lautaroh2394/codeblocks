import { Game } from "./models/game.model.class";
import { Player } from "./models/player.model.class";
import { Script } from "./models/script.model.class";
import { GameView } from "./views/game.view.class";
import { ControlView } from "./views/control.view.class";
import { ScriptView } from "./views/script.view.class";
import { ScoresView } from "./views/scores.view.class";
import { Sentence } from "./models/sentence.model.class";
import { Card } from "./models/card.model.class";
import { CardType } from "./utils/types.constants";

function start(){
  const sentences = 
    new Array(40).fill(0).map((_, i)=> new Sentence('prueba ' + i ))
  const script = new Script(sentences);

  const cards = [
    new Card(CardType.SENTENCE, 'sumar 1', 'suma 1 a una variable'),
    new Card(CardType.SENTENCE, 'restar 1', 'restar 1 a una variable'),
    new Card(CardType.OPERACION, 'sumar', 'suma dos variables'),
    new Card(CardType.VARIABLE, 'crear', 'crea una variable'),
    new Card(CardType.SENTENCE, 'sumar 1', 'suma 1 a una variable'),
    new Card(CardType.SENTENCE, 'restar 1', 'restar 1 a una variable'),
    new Card(CardType.OPERACION, 'sumar', 'suma dos variables'),
    new Card(CardType.VARIABLE, 'crear', 'crea una variable'),
  ]
  const player = new Player('mi nombre', cards.slice(0,4));
  const player2 = new Player('mi otro nombre', cards.slice(4,8));

  const scriptView = new ScriptView(script)
  const playerView = new ControlView([player, player2])
  const scoresView = new ScoresView([player, player2])

  const game = new Game(
    [player, player2],
    script
  );
  const gameView = new GameView(game, scriptView, playerView, scoresView)

  game.start()
  const el = gameView.getElement()
  document.body.append(el)

  return {
    gameView,
    scriptView,
    scoresView,
    script,
    game
  }
}

const {
  gameView,
  scriptView,
  scoresView,
  script,
  game
} = start();

window["gameView"] = gameView
window["scriptView"] = scriptView
window["scoresView"] = scoresView
window["script"] = script
window["game"] = game