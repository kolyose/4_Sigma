import BaseFragmentState from "./BaseFragmentState";

export default class FragmentStateAnchoring extends BaseFragmentState {
  entry() {
    super.entry();
    this._fragment.makeUndraggable();
    this._fragment.moveToAnchorPosition();
  }

  anchorComplete() {
    super.anchorComplete();
    this._fragment.applyState(
      this._statesFactory.getStateAnchored(this._fragment, this._statesFactory)
    );
  }
}
