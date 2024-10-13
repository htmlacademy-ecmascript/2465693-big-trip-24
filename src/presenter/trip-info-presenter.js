import TripInfoView from '../view/trip-info-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';

export default class TripInfoPresenter {
  #eventPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #mainContainer = null;

  #tripInfoComponent = null;

  constructor(eventPointsModel, destinatinationsModel, offersModel, mainContainer) {
    this.#eventPointsModel = eventPointsModel;
    this.#destinationsModel = destinatinationsModel;
    this.#offersModel = offersModel;
    this.#mainContainer = mainContainer;
    this.#eventPointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView({
      eventPoints: this.#eventPointsModel.eventPoints,
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
    });

    if (!prevTripInfoComponent) {
      render(this.#tripInfoComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);

    render(this.#tripInfoComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
