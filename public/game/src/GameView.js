import {
  Sprite,
  ColorMatrixFilter,
  EventEmitter,
  Text,
  Graphics
} from "./aliases";
import PlayPopup from "./popups/PlayPopup";
import { EVENT_PLAY, EVENT_FORCE_END } from "./events";
import TinkManager from "./utils/TinkManager";

export default class GameView extends EventEmitter {
  constructor(stage) {
    super();
    this._stage = stage;

    this._fragmentsContainer = new Sprite();
    this._stage.addChild(this._fragmentsContainer);

    this._tfCountdown = new Text();
    this._stage.addChild(this._tfCountdown);
  }

  initBackground(texture, position) {
    this._bg = new Sprite(texture);
    this._bg.scale.set(this._scale);
    this._bg.position.set(position.x, position.y);
    this._stage.addChildAt(this._bg, 0);

    const colorMatrix = new ColorMatrixFilter();
    this._bg.filters = [colorMatrix];
    colorMatrix.greyscale(0.1);
  }

  initAbortBtn() {
    const btnBg = new Graphics();
    btnBg.lineStyle(1, 0x0000ff, 1);
    btnBg.beginFill(0xcccccc);
    btnBg.drawRoundedRect(0, 0, 50, 25, 10);
    btnBg.endFill();

    this._btnAbort = TinkManager.createButton([btnBg.generateCanvasTexture()]);
    this._btnAbort.x = this._bg.width - this._btnAbort.width;
    this._stage.addChild(this._btnAbort);

    this._btnAbort.release = () => {
      this.emit(EVENT_FORCE_END);
    };
  }

  updateCountdown(time) {
    this._tfCountdown.text = Math.round(time).toString();
  }

  addFragments(fragments) {
    /* eslint-disable */
    fragments.forEach(fragment => {
      fragment.view.scale.set(this._scale, this._scale);
      fragment.view.x = Math.random() * 500;
      fragment.view.y = Math.random() * 500;
      this._fragmentsContainer.addChild(fragment.view);
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
