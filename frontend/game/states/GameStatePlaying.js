import BaseGameState from "./BaseGameState";

export default class GameStatePlaying extends BaseGameState {
  entry() {
    super.entry();
    this._game.resetView();
    this._game.initView();
    this._game.resetFragments();
    this._game.setupFragments();
    this._game.updateRoundCountdownView();
    this._game.startRoundCountdown();
  }

  exit() {
    super.exit();
    this._game.stopRoundCountdown();
  }

  stopRound(isWin) {
    super.stopRound(isWin);

    if (isWin) {
      this._game.applyState(this._statesFactory.getStateWin(this._game));
    } else {
      this._game.applyState(this._statesFactory.getStateLose(this._game));
    }
  }

  abortRound() {
    this._game.applyState(this._statesFactory.getStateAborting(this._game));
  }
}
