import { render, replace, remove } from '../framework/render.js';
import FormEditView from '../view/form-edit-view.js';
import LocationPointView from '../view/location-point-view.js';
import { isEscapeKey } from '../utils.js';

//режим точки события. DEFAULT - просмотр, EDITING - редактирование
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventPointItem = null;
  #editEventPoint = null;
  #eventPoint = null;
  #eventPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #container = null;
  #handleDataChange = null;
  #handleModeChange = null;
  //флаг хранящий текущий режим отображения
  #mode = Mode.DEFAULT;

  constructor({ container, eventPointsModel, offersModel, destinationsModel, onDataChange, onModeChange }) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
      destinations: this.#destinationsModel.destinations,
      typeOffers: this.#offersModel.getOffersType(),
      onFormSubmit: this.#onFormSubmit,
      onRollupButtonClick: this.#onRollupButtonClick,
    });

    //проверка были ли отрисованы компоненты
    if (prevEventPointComponent === null || prevEditEventPointComponent === null) {
      render(this.#eventPoint, this.#container);
      return {};
    }

    //проверка , чтобы не пытаться заменить то, что не было отрисовано
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPoint, prevEventPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventPoint, prevEditEventPointComponent);
    }

    remove(prevEventPointComponent);
    remove(prevEditEventPointComponent);
  }

  destroy() {
    remove(this.#eventPoint);
    remove(this.#editEventPoint);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditToView();
    }
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
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  /**функция replace framework'a , по замене формы редактирования на просмотр точки */
  #replaceEditToView = () => {
    replace(this.#eventPoint, this.#editEventPoint);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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
}
