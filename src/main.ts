import { Game } from "./models/game.model.class";
import { Player } from "./models/player.model.class";
import { Script } from "./models/script.model.class";
import { GameView } from "./views/game.view.class";
import { ControlView } from "./views/control.view.class";
import { ScriptView } from "./views/script.view.class";
import { ScoresView } from "./views/scores.view.class";

function start(){
  const game = new Game();
  const script = new Script();
  const player = new Player();
  const scriptView = new ScriptView(script)
  const playerView = new ControlView(player)
  const scoresView = new ScoresView()
  const gameView = new GameView(game, scriptView, playerView, scoresView)

  const el = gameView.render()
  document.body.append(el)
}

start();