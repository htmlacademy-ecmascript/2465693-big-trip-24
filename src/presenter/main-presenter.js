import FormEditView from '../view/form-edit-view.js';
import LocationPointView from '../view/location-point-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view';
import { isEscapeKey } from '../utils.js';

import { render, RenderPosition, replace } from '../framework/render.js';

export default class MainPresenter {
  #eventList = new EventListView();
  #container = null;
  #eventPointModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #eventListPoints = [];

  constructor({ container, eventPointModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#eventPointModel = eventPointModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#eventListPoints = [...this.#eventPointModel.eventPoint];
    this.#renderEventList();
  }

  /**приватный метод для отрисовки точки события,
   * принимает объект точки события
   */
  #renderEventPoint(eventPointItem) {
    /**создание точки */
    const eventPoint = new LocationPointView({
      eventPoint: eventPointItem,
      destination: this.#destinationsModel.getDestinationsById(eventPointItem.destination),
      offers: [...this.#offersModel.getOffersById(eventPointItem.type, eventPointItem.offers)],
      onEditButtonClick,
    });

    /**слздание формы редактирования */
    const editEventPoint = new FormEditView({
      eventPoint: eventPointItem,
      availableOffers: this.#offersModel.getOffersByType(eventPointItem.type),
      pointDestination: this.#destinationsModel.getDestinationsById(eventPointItem.destination),
      destination: this.#destinationsModel.destinations,
      arrayTypeOffers: this.#offersModel.getOffersType(),
      onFormSubmit,
      onRollupButtonClick,
    });

    const escKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceEditToView();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    function onEditButtonClick() {
      replaceViewToEdit();
      document.addEventListener('keydown', escKeyDownHandler);
    }
    /**вызов функции replace framework'a , по замене точки на форму редактирования*/
    function replaceViewToEdit() {
      replace(editEventPoint, eventPoint);
    }

    function onRollupButtonClick() {
      replaceEditToView();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function onFormSubmit() {
      replaceEditToView();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    /**вызов функции replace framework'a , по замене формы редактирования на просмотр точки */
    function replaceEditToView() {
      replace(eventPoint, editEventPoint);
    }

    render(eventPoint, this.#eventList.element);
  }

  #renderEventList() {
    render(new SortView(), this.#container, RenderPosition.BEFOREEND);
    render(this.#eventList, this.#container);

    for (let i = 0; i < this.#eventListPoints.length; i++) {
      this.#renderEventPoint(this.#eventListPoints[i]);
    }
  }
}
