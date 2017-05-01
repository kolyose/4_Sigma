import BasePopup from "./BasePopup";
// import { Loader } from "./../aliases";
import { EVENT_PLAY } from "./../events";
import UIComponentsFactory from "./../view/UIComponentsFactory";

export default class PlayPopup extends BasePopup {
  init() {
    super.init();

    this._label = UIComponentsFactory.createLabel("placeholder", "black");
    this._label.y = 10;
    this._view.addChild(this._label);

    /* this._btn = UIComponentsFactory.createButtonFromTextures([
      Loader.resources.btn.texture
    ]);*/

    this._btn = UIComponentsFactory.createButtonFromGraphics("Play", 0x00bb00);
    this._btn.x = (this._view.width - this._btn.width) / 2;
    this._btn.y = this._view.height - this._btn.height - 10;

    this._btn.release = () => {
      this.emit(EVENT_PLAY);
    };
    this._view.addChild(this._btn);
  }

  set message(txt) {
    this._label.text = txt;
    this._label.x = (this._view.width - this._label.width) / 2;
  }
}
