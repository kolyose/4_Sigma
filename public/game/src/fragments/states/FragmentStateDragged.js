import BaseFragmentState from "./BaseFragmentState";
import Model from "./../../model/Model";
import app from "./../../app";

export default class FragmentStateDragged extends BaseFragmentState {
  constructor(fragment, statesFactory) {
    super(fragment, statesFactory);

    this._checkPosition = this.checkPosition.bind(this);
  }

  entry() {
    super.entry();
    app.ticker.add(this._checkPosition);
  }

  exit() {
    super.exit();
    app.ticker.remove(this._checkPosition);
  }

  toggleDrag() {
    this._fragment.applyState(
      this._statesFactory.getStateDraggable(this._fragment, this._statesFactory)
    );
  }

  checkPosition() {
    if (
      Math.abs(this._fragment.view.x - this._fragment.anchorPosition.x) >
      Model.anchorPrecision
    ) {
      return;
    }

    if (
      Math.abs(this._fragment.view.y - this._fragment.anchorPosition.y) >
      Model.anchorPrecision
    ) {
      return;
    }

    this._fragment.applyState(
      this._statesFactory.getStateAnchored(this._fragment, this._statesFactory)
    );
  }
}
