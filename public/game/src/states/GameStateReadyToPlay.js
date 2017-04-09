import BaseGameState from "./BaseGameState";
import { MESSAGE_PLAY } from "./../localization";

export default class GameStateReadyToPlay extends BaseGameState {
  entry() {
    super.entry();
    this._game.showPlayPopup(MESSAGE_PLAY);
  }

  exit() {
    super.exit();
    this._game.hidePlayPopup();
  }

  startRound() {
    super.startRound();
    this._game.applyState(this._statesFactory.getStatePlaying(this._game));
  }
}
