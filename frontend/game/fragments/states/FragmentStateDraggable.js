import BaseFragmentState from "./BaseFragmentState";

export default class FragmentStateDraggable extends BaseFragmentState {
  entry() {
    super.entry();
    this._fragment.makeDraggable();
  }

  toggleDrag() {
    this._fragment.applyState(
      this._statesFactory.getStateDragged(this._fragment, this._statesFactory)
    );
  }

  anchor() {
    super.anchor();
    this._fragment.applyState(
      this._statesFactory.getStateAnchoring(this._fragment, this._statesFactory)
    );
  }
}
