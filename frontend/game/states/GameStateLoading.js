import BaseGameState from "./BaseGameState";

export default class GameStateLoading extends BaseGameState {
  entry() {
    super.entry();
    this._game.displaySpinner();
    this._game.loadData();
  }

  onLoadComplete() {
    super.onLoadComplete();
    this._game.destroySpinner();
    this._game.applyState(this._statesFactory.getStateInit(this._game));
  }
}
