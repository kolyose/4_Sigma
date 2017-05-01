import HorizontalLayoutSettings from "./HorizontalLayoutSettings";
import VerticalLayoutSettings from "./VerticalLayoutSettings";
import app from "./../app";
import { EventEmitter } from "./../aliases";
import { EVENT_ROUND_TIMER_TICK, EVENT_ROUND_TIME_ENDED } from "./../events";

class Model extends EventEmitter {
  constructor() {
    super();
    /* TODO: put here and parse settings JSON */
    this._layoutSettings = undefined;
    this._deltaTime = 0;
    this._updateTimeRemaining = this._updateTimeRemaining.bind(this);
  }

  /*
    *    Factory method to init layout settings based on image dimentions
    */
  initLayoutSettingsByImageDimensions(imageDimensions, rendererDimensions) {
    this._imageDimensions = imageDimensions;
    this._rendererDimensions = rendererDimensions;

    if (imageDimensions.width > imageDimensions.height) {
      this._layoutSettings = new HorizontalLayoutSettings(
        imageDimensions,
        rendererDimensions
      );
      return;
    }
    this._layoutSettings = new VerticalLayoutSettings(
      imageDimensions,
      rendererDimensions
    );
  }

  startRoundCountdown() {
    this._timeRemaining = this.roundDuration;
    app.ticker.add(this._updateTimeRemaining);
  }

  stopRoundCountdown() {
    app.ticker.remove(this._updateTimeRemaining);
  }

  _updateTimeRemaining() {
    this._deltaTime += app.ticker.elapsedMS;
    if (this._deltaTime < 1000) return;

    this._timeRemaining -= this._deltaTime / 1000;
    this._deltaTime = 0;
    this.emit(EVENT_ROUND_TIMER_TICK);

    if (this._timeRemaining <= 0) {
      this.emit(EVENT_ROUND_TIME_ENDED);
    }
  }

  set fragmentsNumber(value) {
    this._fragmentsNumber = parseInt(value, 10);
  }

  set roundDuration(value) {
    this._roundDuration = parseInt(value, 10);
  }

  get fragmentsNumber() {
    return this._fragmentsNumber;
  }

  get roundDuration() {
    return this._roundDuration;
  }

  get scale() {
    return this._layoutSettings.scale;
  }

  get rows() {
    return this._layoutSettings.getRowsByFragmentsNumber(this.fragmentsNumber);
  }

  get columns() {
    return this._layoutSettings.getColumnsByFragmentsNumber(
      this.fragmentsNumber
    );
  }

  get fragmentDimensions() {
    return this._layoutSettings.getFragmentDimensionsByFragmentsNumber(
      this.fragmentsNumber
    );
  }

  get anchorPrecision() {
    return 10;
  }

  get timeRemaining() {
    return this._timeRemaining;
  }

  get bgPosition() {
    return {
      x: Math.abs(
        this._rendererDimensions.width -
          this._imageDimensions.width * this.scale
      ) / 2,
      y: Math.abs(
        this._rendererDimensions.height -
          this._imageDimensions.height * this.scale
      ) / 2
    };
  }

  get fragmentsPositionRanges() {
    return this._layoutSettings.fragmentsPositionRanges;
  }
}

export default new Model();
