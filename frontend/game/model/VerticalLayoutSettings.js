import BaseLayoutSettings from "./BaseLayoutSettings";
import { Rectangle } from "./../aliases";

export default class VerticalLayoutSettings extends BaseLayoutSettings {
  //eslint-disable-next-line
  getRowsByFragmentsNumber(fragmentsNumber) {
    switch (fragmentsNumber) {
      case 12:
        return 4;
      case 20:
        return 5;
      case 30:
        return 6;
      default:
        return 1;
    }
  }

  //eslint-disable-next-line
  getColumnsByFragmentsNumber(fragmentsNumber) {
    switch (fragmentsNumber) {
      case 12:
        return 3;
      case 20:
        return 4;
      case 30:
        return 5;
      default:
        return 1;
    }
  }

  //TODO: adjust ranges
  get fragmentsPositionRanges() {
    return [
      new Rectangle(
        0,
        0,
        this._rendererDimensions.width / 4,
        this._rendererDimensions.height
      ),
      new Rectangle(
        this._rendererDimensions.width * 3 / 4,
        0,
        this._rendererDimensions.width / 4,
        this._rendererDimensions.height
      )
    ];
  }

  get scale() {
    return this._rendererDimensions.height / this._imageDimensions.height;
  }
}
