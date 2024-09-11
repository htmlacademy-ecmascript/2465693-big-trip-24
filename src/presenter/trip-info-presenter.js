import TripInfoView from '../view/trip-info-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class TripInfoPresenter {
  #container = null;
  #tripInfoComponent = new TripInfoView();

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
  }
}
