import TripInfoView from '../view/trip-info-view.js';
import { render, RenderPosition } from '../render.js';

export default class TripInfoPresenter {
  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(new TripInfoView(), this.container, RenderPosition.AFTERBEGIN);
  }
}
