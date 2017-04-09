export default class BaseFragmentState {
  constructor(fragment, statesFactory) {
    this._fragment = fragment;
    this._statesFactory = statesFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  entry() {}

  // eslint-disable-next-line class-methods-use-this
  exit() {}

  // eslint-disable-next-line class-methods-use-this
  activate() {}

  reset() {
    this._fragment.applyState(this._statesFactory.getStateInit(this._fragment));
  }

  // eslint-disable-next-line class-methods-use-this
  anchor() {}

  // eslint-disable-next-line class-methods-use-this
  anchorComplete() {}

  // eslint-disable-next-line class-methods-use-this
  toggleDrag() {}
}
