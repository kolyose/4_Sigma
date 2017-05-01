import { EventEmitter } from "./../aliases";
import UIComponentsFactory from "./../view/UIComponentsFactory";

export default class BasePopup extends EventEmitter {
  init() {
    this._view = UIComponentsFactory.createContainer(
      UIComponentsFactory.createPopupBackground()
    );
  }

  show() {
    this._view.visible = true;
  }

  hide() {
    this._view.visible = false;
  }

  get view() {
    return this._view;
  }
}
