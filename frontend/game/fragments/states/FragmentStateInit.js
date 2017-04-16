import BaseFragmentState from "./BaseFragmentState";

export default class FragmentStateInit extends BaseFragmentState {
  entry() {
    super.entry();
    this._fragment.makeUndraggable();
  }

  activate() {
    super.activate();
    this._fragment.applyState(
      this._statesFactory.getStateDraggable(this._fragment)
    );
  }
}
