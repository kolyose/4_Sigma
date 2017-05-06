import { ColorMatrixFilter, EventEmitter } from "./../aliases";
import { EVENT_PLAY, EVENT_FORCE_END } from "./../events";
import UIComponentsFactory from "./UIComponentsFactory";
import PlayPopup from "./../popups/PlayPopup";

export default class GameView extends EventEmitter {
  constructor(view, stage, scale) {
    super();
    this._view = view;
    this._stage = stage;
    this._scale = scale;

    this._fragmentsContainer = UIComponentsFactory.createContainer();
    this._stage.addChild(this._fragmentsContainer);

    this._tfCountdown = UIComponentsFactory.createLabel("", "white");
    this._stage.addChild(this._tfCountdown);
  }

  initBackground(texture, position) {
    this._bg = UIComponentsFactory.createContainer(texture);
    this._bg.scale.set(this._scale);
    this._bg.position.set(position.x, position.y);
    this._stage.addChildAt(this._bg, 0);

    const colorMatrix = new ColorMatrixFilter();
    this._bg.filters = [colorMatrix];
    colorMatrix.greyscale(0.1);
  }

  initAbortBtn() {
    this._btnAbort = UIComponentsFactory.createButtonFromGraphics(
      "Finish",
      0xff0000
    );
    this._btnAbort.x = this._view.width - this._btnAbort.width - 10;
    this._btnAbort.y = 10;

    this._btnAbort.release = () => {
      this.emit(EVENT_FORCE_END);
    };

    this._stage.addChild(this._btnAbort);
  }

  updateCountdown(time) {
    const timeString = time < 0 ? "" : Math.round(time).toString();
    this._tfCountdown.text = timeString;
  }

  addFragments(fragments, positionRanges) {
    let counter = 0;
    /* eslint-disable */
    fragments.forEach(fragment => {
      fragment.view.scale.set(this._scale, this._scale);

      const positionsRangeRectangle = positionRanges[
        counter % positionRanges.length
      ];

      fragment.view.x = positionsRangeRectangle.x +
        Math.random() * (positionsRangeRectangle.width - fragment.view.width);

      fragment.view.y = positionsRangeRectangle.y +
        Math.random() * (positionsRangeRectangle.height - fragment.view.height);

      this._fragmentsContainer.addChild(fragment.view);

      counter++;
    });
  }

  reset() {
    this._fragmentsContainer.removeChildren();
  }

  initPlayPopup() {
    this._playPopup = new PlayPopup();
    this._playPopup.init();
    this._playPopup.on(EVENT_PLAY, () => {
      this.emit(EVENT_PLAY);
    });
    this._stage.addChild(this._playPopup.view);

    this._playPopup.view.x = (this._view.width - this._playPopup.view.width) /
      2;

    this._playPopup.view.y = (this._view.height - this._playPopup.view.height) /
      2;
  }

  showPlayPopup(message) {
    this._playPopup.message = message;
    this._playPopup.show();
  }

  hidePlayPopup() {
    this._playPopup.hide();
  }

  set scale(value) {
    this._scale = value;
  }
}
