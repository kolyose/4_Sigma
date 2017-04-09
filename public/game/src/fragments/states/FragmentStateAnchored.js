import BaseFragmentState from "./BaseFragmentState";
import app from "./../../app";

export default class FragmentStateAnchored extends BaseFragmentState {
  constructor(fragment, statesFactory) {
    super(fragment, statesFactory);
    this._remainAnchored = this._remainAnchored.bind(this);
  }

  entry() {
    super.entry();
    this._remainAnchored();
    app.ticker.add(this._remainAnchored);
    this._fragment.makeUndraggable();
    this._fragment.dispatchAnchored();
  }

  exit() {
    super.exit();
    app.ticker.remove(this._remainAnchored);
  }

  toggleDrag() {
    app.ticker.remove(this._remainAnchored);
  }

  _remainAnchored() {
    this._fragment.view.x = this._fragment.anchorPosition.x;
    this._fragment.view.y = this._fragment.anchorPosition.y;
  }
}
