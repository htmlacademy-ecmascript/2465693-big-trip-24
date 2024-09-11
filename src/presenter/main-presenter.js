import FormCreateView from '../view/form-create-view.js';
import FormEditView from '../view/form-edit-view.js';
import LocationPointView from '../view/location-point-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view';
import { getRandomArrayElement } from '../utils.js';

import { render, RenderPosition } from '../framework/render.js';

export default class MainPresenter {
  #eventList = new EventListView();
  #container = null;
  #eventPointModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #eventListPoints = [];
  #offers = [];
  #destinations = [];

  constructor({ container, eventPointModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#eventPointModel = eventPointModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#eventListPoints = [...this.#eventPointModel.eventPoint];
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];

    const editEventPoint = getRandomArrayElement(this.#eventListPoints);
    const formEditView = new FormEditView({
      eventPoint: editEventPoint,
      availableOffers: this.#offersModel.getOffersByType(editEventPoint.type),
      pointDestination: this.#destinationsModel.getDestinationsById(editEventPoint.destination),
      destination: this.#destinationsModel.destinations,
      arrayTypeOffers: this.#offersModel.getOffersType(),
    });

    render(new SortView(), this.#container, RenderPosition.BEFOREEND);
    render(this.#eventList, this.#container);
    render(new FormCreateView(), this.#eventList.element);
    render(formEditView, this.#eventList.element);

    for (let i = 0; i < this.#eventListPoints.length; i++) {
      const eventPoint = new LocationPointView({
        eventPoint: this.#eventListPoints[i],
        destination: this.#destinationsModel.getDestinationsById(this.#eventListPoints[i].destination),
        offers: [...this.#offersModel.getOffersById(this.#eventListPoints[i].type, this.#eventListPoints[i].offers)],
      });
      render(eventPoint, this.#eventList.element);
    }
  }
}
