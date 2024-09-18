import { render, replace, remove } from '../framework/render.js';
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
  #handleDataChange = null;

  constructor({ container, eventPointsModel, offersModel, destinationsModel, onDataChange }) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
  }

  init(eventPointItem) {
    this.#eventPointItem = eventPointItem;

    const prevEventPointComponent = this.#eventPoint;
    const prevEditEventPointComponent = this.#editEventPoint;

    this.#eventPoint = new LocationPointView({
      eventPoint: this.#eventPointItem,
      destination: this.#destinationsModel.getDestinationsById(eventPointItem.destination),
      offers: [...this.#offersModel.getOffersById(eventPointItem.type, eventPointItem.offers)],
      onEditButtonClick: this.#onEditButtonClick,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#editEventPoint = new FormEditView({
      eventPoint: this.#eventPointItem,
      availableOffers: this.#offersModel.getOffersByType(eventPointItem.type),
      pointDestination: this.#destinationsModel.getDestinationsById(eventPointItem.destination),
      destination: this.#destinationsModel.destinations,
      arrayTypeOffers: this.#offersModel.getOffersType(),
      onFormSubmit: this.#onFormSubmit,
      onRollupButtonClick: this.#onRollupButtonClick,
    });

    //проверка были ли отрисованы компоненты
    if (prevEventPointComponent === null || prevEditEventPointComponent === null) {
      render(this.#eventPoint, this.#container);
      return {};
    }

    //проверка , чтобы не пытаться заменить то, что не было отрисовано
    if (this.#container.contains(prevEventPointComponent.element)) {
      replace(this.#eventPoint, prevEventPointComponent);
    }

    if (this.#container.contains(prevEditEventPointComponent.element)) {
      replace(this.#editEventPoint, prevEditEventPointComponent);
    }

    remove(prevEventPointComponent);
    remove(prevEditEventPointComponent);
  }

  destroy() {
    remove(this.#eventPoint);
    remove(this.#editEventPoint);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceEditToView();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  /**функция по замене точки на форму редактирования */
  #onEditButtonClick = () => {
    this.#replaceViewToEdit();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  /**функция добавления в избранное */
  #onFavoriteClick = () => {
    this.#handleDataChange({ ...this.#eventPointItem, isFavorite: !this.#eventPointItem.isFavorite });
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
  #onFormSubmit = (eventPointItem) => {
    this.#handleDataChange(eventPointItem);
    this.#replaceEditToView();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  /**функция replace framework'a , по замене формы редактирования на просмотр точки */
  #replaceEditToView = () => {
    replace(this.#eventPoint, this.#editEventPoint);
  };
}
