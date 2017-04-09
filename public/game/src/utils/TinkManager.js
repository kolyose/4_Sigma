/* global PIXI Tink*/

import app from "./../app";

class TinkManager {
  constructor() {
    this._tink = new Tink(PIXI, app.view);

    app.ticker.add(() => {
      this._tink.update();
    });
  }

  makeDraggable(sprite) {
    if (!this._tink) {
      throw new Error("TinkManager should be initialized first!");
    }

    this._tink.makeDraggable(sprite);
  }

  makeUndraggable(sprite) {
    if (!this._tink) {
      throw new Error("TinkManager should be initialized first!");
    }
    this._tink.makeUndraggable(sprite);
  }

  createButton(frames) {
    return this._tink.button(frames);
  }

  getDragSpriteWhenFound() {
    const pointer = this._pointer;
    return new Promise((resolve, reject) => {
      const checkForDragSprite = function() {
        if (pointer.dragSprite) {
          app.ticker.remove(checkForDragSprite);
          resolve(pointer.dragSprite);
        }
      };
      app.ticker.add(checkForDragSprite);
    });
  }

  get pointer() {
    if (!this._pointer) {
      this._pointer = this._tink.makePointer();
    }
    return this._pointer;
  }
}

export default new TinkManager();
