import { render, replace } from '../framework/render.js';
import FormEditView from '../view/form-edit-view.js';
import LocationPointView from '../view/location-point-view.js';
import { isEscapeKey } from '../utils.js';

export default class EventPresenter {
  #eventPointItem = null;
  #editEventPoint = null;
  #eventPoint = null;
  #eventPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #container = null;

  constructor({ container, eventPointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init(eventPointItem) {
    this.#eventPointItem = eventPointItem;

    this.#eventPoint = new LocationPointView({
      eventPoint: this.#eventPointItem,
      destination: this.#destinationsModel.getDestinationsById(eventPointItem.destination),
      offers: [...this.#offersModel.getOffersById(eventPointItem.type, eventPointItem.offers)],
      onEditButtonClick: () => this.#onEditButtonClick(),
    });

    this.#editEventPoint = new FormEditView({
      eventPoint: this.#eventPointItem,
      availableOffers: this.#offersModel.getOffersByType(eventPointItem.type),
      pointDestination: this.#destinationsModel.getDestinationsById(eventPointItem.destination),
      destination: this.#destinationsModel.destinations,
      arrayTypeOffers: this.#offersModel.getOffersType(),
      onFormSubmit: () => this.#onFormSubmit(),
      onRollupButtonClick: () => this.#onRollupButtonClick(),
    });
    render(this.#eventPoint, this.#container);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceEditToView();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onEditButtonClick = () => {
    this.#replaceViewToEdit();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  /**функция replace framework'a , по замене точки на форму редактирования*/
  #replaceViewToEdit = () => {
    replace(this.#editEventPoint, this.#eventPoint);
  };

  /**функция по замене формы редактирования на точку */
  #onRollupButtonClick = () => {
    this.#replaceEditToView();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  /**функция смены формы редактирования на просмотр, при нажатии на кнопку Save */
  #onFormSubmit = () => {
    this.#replaceEditToView();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  /**функция replace framework'a , по замене формы редактирования на просмотр точки */
  #replaceEditToView = () => {
    replace(this.#eventPoint, this.#editEventPoint);
  };
}
