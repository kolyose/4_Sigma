export default class BaseGameState {
  constructor(game, statesFactory) {
    this._game = game;
    this._statesFactory = statesFactory;
  }

  // eslint-disable-next-line
  entry() {}

  // eslint-disable-next-line
  exit() {}

  // eslint-disable-next-line
  startRound() {}

  // eslint-disable-next-line
  stopRound(isWin) {}

  // eslint-disable-next-line
  abortRound() {}

  // eslint-disable-next-line
  onLoadComplete() {}
}
