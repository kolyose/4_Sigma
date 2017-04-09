import { Sprite, Graphics, Loader, Text, EventEmitter } from "./../aliases";
import { EVENT_PLAY } from "./../events";
import TinkManager from "./../utils/TinkManager";

export default class PlayPopup extends EventEmitter {
  constructor() {
    super();
    this._view = new Sprite();
    this._label = new Text();
  }

  init() {
    const roundedRect = new Graphics();
    roundedRect.lineStyle(1, 0x000000, 1);
    roundedRect.beginFill(0xffffff);
    roundedRect.drawRoundedRect(0, 0, 600, 300, 10);
    roundedRect.endFill();
    this._view.addChild(roundedRect);
    this._view.addChild(this._label);
    this._btn = TinkManager.createButton([Loader.resources.btn.texture]);
    this._btn.release = () => {
      this.emit(EVENT_PLAY);
    };
    this._view.addChild(this._btn);
  }

  show() {
    this._view.visible = true;
  }

  hide() {
    this._view.visible = false;
  }

  set message(txt) {
    this._label.text = txt;
  }

  get view() {
    return this._view;
  }
}
