import TripInfoView from '../view/trip-info-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class TripInfoPresenter {
  #mainContainer = null;
  #tripInfoComponent = new TripInfoView();

  constructor({ mainContainer }) {
    this.#mainContainer = mainContainer;
  }

  init() {
    render(this.#tripInfoComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }
}
