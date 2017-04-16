/* global PIXI Charm*/
import app from "./../app";

class CharmManager {
  constructor() {
    this._charm = new Charm(PIXI);
    app.ticker.add(() => {
      this._charm.update();
    });
  }

  slide(sprite, targetPos, onComplete) {
    const tween = this._charm.slide(sprite, targetPos.x, targetPos.y);
    tween.onComplete = onComplete;
  }
}

export default new CharmManager();
