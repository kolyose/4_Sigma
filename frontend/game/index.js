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
import GameView from "./view/GameView";
import GameStatesFactory from "./states/GameStatesFactory";

class Game {
  constructor() {
    this._state = undefined;
  }

  applyState(newState) {
    if (this._state) this._state.exit();

    this._state = newState;
    this._state.entry();
  }

  displaySpinner() {
    this._spinnerContainer = document.createElement("div");
    this._spinnerContainer.innerHTML = `<div id="spinner"></div>`;
    document.body.appendChild(this._spinnerContainer);

    this._spinner = document.querySelector("#spinner");
    this._canvas = document.querySelector("canvas");
    this._spinner.style.left = `${(this._canvas.width - this._spinner.clientWidth) / 2}px`;
    this._spinner.style.top = `${(this._canvas.height - this._spinner.clientHeight) / 2}px`;
  }

  destroySpinner() {
    document.body.removeChild(this._spinnerContainer);
  }

  loadData() {
    Loader.add("settings", "http://localhost:3000/settings").load(() => {
      this._settings = JSON.parse(Loader.resources.settings.data);
      Loader.add([
        {
          name: "main",
          url: this._settings.imgUrl,
          crossOrigin: true
        }
      ]).load(() => {
        this._state.onLoadComplete();
      });
    });
  }

  resizeApp() {
    app.renderer.resize(this._settings.width, this._settings.height);
  }

  initModel() {
    const mainTexture = Loader.resources.main.texture;
    Model.initLayoutSettingsByImageDimensions(
      { width: mainTexture.width, height: mainTexture.height },
      { width: app.renderer.width, height: app.renderer.height }
    );

    Model.fragmentsNumber = this._settings.fragments;
    Model.roundDuration = this._settings.time;

    Model.on(EVENT_ROUND_TIMER_TICK, () => {
      this.updateRoundCountdownView();
    });

    Model.on(EVENT_ROUND_TIME_ENDED, () => {
      this.stopRound(false);
    });
  }

  initView() {
    this._view = new GameView(app.view, app.stage, Model.scale);

    this._view.initBackground(Loader.resources.main.texture, Model.bgPosition);
    this._view.initAbortBtn();

    this._view.on(EVENT_FORCE_END, () => {
      this.abortRound();
    });

    this._view.on(EVENT_PLAY, () => {
      this.startRound();
    });
  }

  resetView() {
    this._view.reset();
  }

  initPopups() {
    this._view.initPlayPopup();
  }

  resetFragments() {
    FragmentsManager.removeListener(EVENT_ALL_FRAGMENTS_ANCHORED);
    FragmentsManager.reset();
  }

  setupFragments() {
    const fragments = FragmentsFactory.getFragmentsForTexture(
      Loader.resources.main.texture
    );
    this._view.addFragments(fragments, Model.fragmentsPositionRanges);

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

  abortRound() {
    this._state.abortRound();
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
