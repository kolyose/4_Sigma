import GameStateLoading from "./GameStateLoading";
import GameStateInit from "./GameStateInit";
import GameStateReadyToPlay from "./GameStateReadyToPlay";
import GameStatePlaying from "./GameStatePlaying";
import GameStateWin from "./GameStateWin";
import GameStateLose from "./GameStateLose";
import GameStateAborting from "./GameStateAborting";

class GameStatesFactory {
  constructor() {
    this._statesPool = new WeakMap();
  }

  getStateLoading(game) {
    if (!this._statesPool.get(GameStateLoading)) {
      this._statesPool.set(GameStateLoading, new GameStateLoading(game, this));
    }
    return this._statesPool.get(GameStateLoading);
  }

  getStateInit(game) {
    if (!this._statesPool.get(GameStateInit)) {
      this._statesPool.set(GameStateInit, new GameStateInit(game, this));
    }
    return this._statesPool.get(GameStateInit);
  }

  getStateReadyToPlay(game) {
    if (!this._statesPool.get(GameStateReadyToPlay)) {
      this._statesPool.set(
        GameStateReadyToPlay,
        new GameStateReadyToPlay(game, this)
      );
    }
    return this._statesPool.get(GameStateReadyToPlay);
  }

  getStatePlaying(game) {
    if (!this._statesPool.get(GameStatePlaying)) {
      this._statesPool.set(GameStatePlaying, new GameStatePlaying(game, this));
    }
    return this._statesPool.get(GameStatePlaying);
  }

  getStateWin(game) {
    if (!this._statesPool.get(GameStateWin)) {
      this._statesPool.set(GameStateWin, new GameStateWin(game, this));
    }
    return this._statesPool.get(GameStateWin);
  }

  getStateLose(game) {
    if (!this._statesPool.get(GameStateLose)) {
      this._statesPool.set(GameStateLose, new GameStateLose(game, this));
    }
    return this._statesPool.get(GameStateLose);
  }

  getStateAborting(game) {
    if (!this._statesPool.get(GameStateAborting)) {
      this._statesPool.set(
        GameStateAborting,
        new GameStateAborting(game, this)
      );
    }
    return this._statesPool.get(GameStateAborting);
  }
}

export default new GameStatesFactory();
