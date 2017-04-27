import BaseGameState from "./BaseGameState";

export default class GameStateInit extends BaseGameState {
  entry() {
    super.entry();
    this._game.resizeApp();
    this._game.initModel();
    this._game.initView();
    this._game.initPopups();
    this._game.applyState(this._statesFactory.getStateReadyToPlay(this._game));
  }
}
