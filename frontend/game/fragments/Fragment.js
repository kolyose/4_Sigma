import { Sprite, EventEmitter } from "./../aliases";
import TinkManager from "./../utils/TinkManager";
import CharmManager from "./../utils/CharmManager";
import { EVENT_FRAGMENT_ANCHORED } from "./../events";

export default class Fragment extends EventEmitter {
  constructor(id, texture, anchorPosition) {
    super();
    this._id = id;
    this._sprite = new Sprite(texture);
    TinkManager.makeDraggable(this._sprite);
    this._anchorPosition = anchorPosition;
    this._state = undefined;
  }

  applyState(newState) {
    if (this._state) this._state.exit();
    this._state = newState;
    this._state.entry();
  }

  activate() {
    this._state.activate();
  }

  reset() {
    this._state.reset();
  }

  toggleDrag() {
    this._state.toggleDrag();
  }

  makeDraggable() {
    this._sprite.draggable = true;
  }

  makeUndraggable() {
    this._sprite.draggable = false;
  }

  anchor() {
    this._state.anchor();
  }

  moveToAnchorPosition() {
    CharmManager.slide(this._sprite, this._anchorPosition, () => {
      this._state.anchorComplete();
    });
  }

  dispatchAnchored() {
    this.emit(EVENT_FRAGMENT_ANCHORED);
  }

  get anchorPosition() {
    return this._anchorPosition;
  }

  get view() {
    return this._sprite;
  }

  get id() {
    return this._id;
  }
}
