import TinkManager from "./../utils/TinkManager";
import { EventEmitter } from "./../aliases";
import {
  EVENT_FRAGMENT_ANCHORED,
  EVENT_ALL_FRAGMENTS_ANCHORED
} from "./../events";

class FragmentsManager extends EventEmitter {
  constructor() {
    super();
    this.anchoredFragments = 0;

    TinkManager.pointer.press = () => {
      if (!this._fragments || !this._fragments.length) return;

      TinkManager.getDragSpriteWhenFound().then(dragSprite => {
        this._fragments.every(fragment => {
          if (dragSprite === fragment.view) {
            if (this.draggingFragment) {
              this.draggingFragment.toggleDrag();
            }

            this.draggingFragment = fragment;
            this.draggingFragment.toggleDrag();
            return false;
          }
          return true;
        });
      });
    };

    TinkManager.pointer.release = () => {
      if (!this.draggingFragment) return;

      this.draggingFragment.toggleDrag();
      this.draggingFragment = null;
    };
  }

  anchorAllFragments() {
    if (this._fragments) {
      this._fragments.forEach(fragment => {
        fragment.anchor();
      });
    }
  }

  reset() {
    if (this._fragments) {
      this._fragments.forEach(fragment => {
        fragment.removeListener(EVENT_FRAGMENT_ANCHORED);
        fragment.reset();
      });
    }
    this._fragments = [];
    this.draggingFragment = undefined;
    this.anchoredFragments = 0;
  }

  set fragments(frags) {
    this._fragments = frags;
    this._fragments.forEach(fragment => {
      fragment.activate();
      fragment.once(EVENT_FRAGMENT_ANCHORED, () => {
        this.anchoredFragments += 1;
        if (this.anchoredFragments === this.fragments.length) {
          this.emit(EVENT_ALL_FRAGMENTS_ANCHORED);
        }
      });
    });
  }

  get fragments() {
    return this._fragments;
  }
}

export default new FragmentsManager();
