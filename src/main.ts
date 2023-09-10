import { Game } from "./models/game.model.class";
import { Player } from "./models/player.model.class";
import { Script } from "./models/script.model.class";
import { GameView } from "./views/game.view.class";
import { ControlView } from "./views/control.view.class";
import { ScriptView } from "./views/script.view.class";
import { ScoresView } from "./views/scores.view.class";
import { Sentence } from "./models/sentence.model.class";
import { Card } from "./models/card.model.class";

function start(){
  const game = new Game();
  const sentences = 
    new Array(40).fill(0).map((_, i)=> new Sentence('prueba ' + i ))
  const script = new Script(sentences);

  const cards = [
    new Card('sentencia', 'sumar 1', 'suma 1 a una variable'),
    new Card('sentencia', 'restar 1', 'restar 1 a una variable'),
    new Card('operacion', 'sumar', 'suma dos variables'),
    new Card('variable', 'crear', 'crea una variable'),
    new Card('sentencia', 'sumar 1', 'suma 1 a una variable'),
    new Card('sentencia', 'restar 1', 'restar 1 a una variable'),
    new Card('operacion', 'sumar', 'suma dos variables'),
    new Card('variable', 'crear', 'crea una variable'),
  ]
  const player = new Player('mi nombre', cards);
  const player2 = new Player('mi otro nombre');

  const scriptView = new ScriptView(script)
  const playerView = new ControlView(player)
  const scoresView = new ScoresView([player, player2])
  const gameView = new GameView(game, scriptView, playerView, scoresView)

  const el = gameView.getElement()
  document.body.append(el)
}

start();