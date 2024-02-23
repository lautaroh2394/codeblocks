import { Game } from "./models/game.model";
import { Player } from "./models/player.model";
import { Script } from "./models/script.model";
import { GameView } from "./views/game.view";
import { ControlView } from "./views/control.view";
import { ScriptView } from "./views/script.view";
import { ScoresView } from "./views/scores.view";
import { CardType } from "./utils/types.constants";
import { ExampleCard } from "./models/cards/example-card.model";
import { ExampleSentence } from "./models/sentences/example-sentence.model";

function start(){
  const sentences = 
    new Array(10).fill(0).map((_, i)=> new ExampleSentence(1 + i ))
  const script = new Script(sentences);

  const cards = [
    new ExampleCard(CardType.SENTENCE, 'sumar 1', 'suma 1 a una variable'),
    new ExampleCard(CardType.SENTENCE, 'restar 1', 'restar 1 a una variable'),
    new ExampleCard(CardType.OPERATION, 'sumar', 'suma dos variables'),
    new ExampleCard(CardType.VARIABLE, 'crear', 'crea una variable'),
    new ExampleCard(CardType.SENTENCE, 'sumar 1', 'suma 1 a una variable'),
    new ExampleCard(CardType.SENTENCE, 'restar 1', 'restar 1 a una variable'),
    new ExampleCard(CardType.OPERATION, 'sumar', 'suma dos variables'),
    new ExampleCard(CardType.VARIABLE, 'crear', 'crea una variable'),
  ]
  const player = new Player('mi nombre', script, cards.slice(0,4));
  const player2 = new Player('mi otro nombre', script, cards.slice(4,8));

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

// For debugging purposes
window.gameView = gameView
window.scriptView = scriptView
window.scoresView = scoresView
window.script = script
window.game = game