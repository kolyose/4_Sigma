import { Loader } from "./aliases";
import Model from "./model/Model";
import FragmentsFactory from "./fragments/FragmentsFactory";
import FragmentsManager from "./fragments/FragmentsManager";
import app from "./app";
import {
  EVENT_ALL_FRAGMENTS_ANCHORED,
  EVENT_PLAY,
  EVENT_FORCE_END,
  EVENT_ROUND_TIMER_TICK,
  EVENT_ROUND_TIME_ENDED
} from "./events";
import GameView from "./GameView";
import GameStatesFactory from "./states/GameStatesFactory";

class Game {
  constructor() {
    this._state = undefined;
    this._view = new GameView(app.stage);
    this._view.on(EVENT_PLAY, this.startRound.bind(this));
  }

  applyState(newState) {
    if (this._state) this._state.exit();

    this._state = newState;
    this._state.entry();
  }

  loadData() {
    Loader.add("settings", "http://localhost:3000/settings").load(() => {
      Loader.add([
        {
          name: "main",
          url: JSON.parse(Loader.resources.settings.data).imgUrl,
          crossOrigin: true
        },
        { name: "btn", url: "img/play-button.jpg" }
      ]).load(() => {
        this._state.onLoadComplete();
      });
    });
  }

  loadImage() {
    Loader.add([
      { name: "main", url: "img/image.jpg" },
      { name: "btn", url: "img/play-button.jpg" }
    ]).load(() => {
      this._state.onLoadComplete();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  initModel() {
    const mainTexture = Loader.resources.main.texture;
    Model.initLayoutSettingsByImageDimensions(
      { width: mainTexture.width, height: mainTexture.height },
      { width: app.renderer.width, height: app.renderer.height }
    );

    Model.on(EVENT_ROUND_TIMER_TICK, () => {
      this.updateRoundCountdownView();
    });

    Model.on(EVENT_ROUND_TIME_ENDED, () => {
      this.stopRound(false);
    });
  }

  initPopups() {
    this._view.initPlayPopup();
  }

  initView() {
    this._view.scale = Model.scale;
    this._view.initBackground(Loader.resources.main.texture, Model.bgPosition);
    this._view.initAbortBtn();
    this._view.on(EVENT_FORCE_END, () => {
      this._state.abortRound();
    });
  }

  resetView() {
    this._view.reset();
  }

  // eslint-disable-next-line class-methods-use-this
  resetFragments() {
    FragmentsManager.removeListener(EVENT_ALL_FRAGMENTS_ANCHORED);
    FragmentsManager.reset();
  }

  setupFragments() {
    const fragments = FragmentsFactory.getFragmentsForTexture(
      Loader.resources.main.texture
    );
    this._view.addFragments(fragments, Model.scale);

    FragmentsManager.fragments = fragments;
    FragmentsManager.once(EVENT_ALL_FRAGMENTS_ANCHORED, () => {
      this.stopRound(true);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  anchorAllFragments() {
    FragmentsManager.anchorAllFragments();
  }

  startRound() {
    this._state.startRound();
  }

  stopRound(isWin) {
    this._state.stopRound(isWin);
  }

  // eslint-disable-next-line class-methods-use-this
  startRoundCountdown() {
    Model.startRoundCountdown();
  }

  // eslint-disable-next-line class-methods-use-this
  stopRoundCountdown() {
    Model.stopRoundCountdown();
  }

  updateRoundCountdownView() {
    this._view.updateCountdown(Model.timeRemaining);
  }

  showPlayPopup(message) {
    this._view.showPlayPopup(message);
  }

  hidePlayPopup() {
    this._view.hidePlayPopup();
  }
}

const game = new Game();
game.applyState(GameStatesFactory.getStateLoading(game));
