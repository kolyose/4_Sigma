import BaseGameState from "./BaseGameState";

export default class GameStateAborting extends BaseGameState {
  entry() {
    super.entry();
    this._game.anchorAllFragments();
  }

  exit() {
    super.exit();
    this._game.resetFragments();
  }

  stopRound(isWin) {
    super.stopRound(isWin);
    this._game.applyState(this._statesFactory.getStateReadyToPlay(this._game));
  }
}
