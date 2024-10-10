import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {
  createEventTypeTemplate,
  createDestinationTemplate,
  createDateTimeTemplate,
  createPriceTemplate,
  createSectionOffersTemplate,
  createSectionDestinationTemplate,
} from './form-elements-view.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createNewFormEditViewTemplate = ({ eventPoint, offers, destinations, typeOffers, isDisabled, isSaving, isDeleting }) => {
  const { type, basePrice, dateFrom, dateTo } = eventPoint;
  const destination = destinations.find((item) => item.id === eventPoint.destination);

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createEventTypeTemplate(type, typeOffers, isDisabled)}
        ${createDestinationTemplate(type, destination, destinations, isDisabled)}
        ${createDateTimeTemplate(dateFrom, dateTo, isDisabled)}
        ${createPriceTemplate(basePrice, isDisabled)}
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSaving ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset" ${isDeleting ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createSectionOffersTemplate(eventPoint, offers, isDisabled)}
        ${createSectionDestinationTemplate(destination)}
      </section>
    </form>
  </li>`;
};

export default class FormEditView extends AbstractStatefulView {
  #originalPoint = null;
  #pointDestination = null;
  #allDestinations = [];
  #offers = [];
  #typeOffers = [];
  #datepickerStart = null;
  #datepickerEnd = null;

  #handleFormSubmit = null;
  #handleRollupButtonClick = null;
  #handleDeleteClick = null;

  constructor({ eventPoint, allDestinations, offers, typeOffers, onFormSubmit, onRollupButtonClick, onDeleteClick }) {
    /**super вызывает конструктор родительского класса*/
    super();
    this.#originalPoint = eventPoint;
    this._setState(FormEditView.parsePointToState(eventPoint));
    this.#allDestinations = allDestinations;
    this.#offers = offers;
    this.#typeOffers = typeOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleDeleteClick = onDeleteClick;
    this._restoreHandlers();
  }

  get template() {
    return createNewFormEditViewTemplate({
      eventPoint: this._state,
      destinations: this.#allDestinations,
      offers: this.#offers,
      typeOffers: this.#typeOffers,
    });
  }

  reset(eventPoint) {
    this.updateElement(FormEditView.parsePointToState(eventPoint));
  }

  //перегружаем метод родителя, чтобы при удалении удалялся более не нужный календарь
  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  //метод для восстановления обработчиков
  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeOptionHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationOptionHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);

    const offersElement = this.element.querySelector('.event__available-offers');
    if (offersElement) {
      offersElement.addEventListener('change', this.#offersChangeHandler);
    }

    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditView.parseStateToPoint(this._state));
  };

  #typeOptionHandler = (evt) => {
    this.updateElement({ type: evt.target.value, offers: [] });
  };

  #destinationOptionHandler = (evt) => {
    const selectedDestination = this.#allDestinations.find((item) => item.name === evt.target.value);
    const selectedDestinationId = selectedDestination ? selectedDestination.id : null;
    this.updateElement({ destination: selectedDestinationId });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
    this.#setDatepickerEnd();
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #priceInputHandler = (evt) => {
    this._setState({ basePrice: evt.target.value });
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick(FormEditView.parseStateToPoint(this.#originalPoint));
  };

  #offersChangeHandler = () => {
    const selectedOffersElement = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const selectedOffersById = selectedOffersElement.map((offer) => offer.dataset.offerId);
    this._setState({ offers: selectedOffersById });
  };

  #setDatepickerStart() {
    this.#datepickerStart = flatpickr(this.element.querySelector('#event-start-time-1'), {
      dateFormat: 'd/m/y H:i', //формат даты
      enableTime: true, //будет доступно задание времени
      // eslint-disable-next-line camelcase
      time_24hr: true, //формат времени
      defaultDate: this._state.dateFrom, //стартовая дата
      onChange: this.#dateFromChangeHandler,
    });
  }

  #setDatepickerEnd() {
    this.#datepickerEnd = flatpickr(this.element.querySelector('#event-end-time-1'), {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      // eslint-disable-next-line camelcase
      time_24hr: true,
      defaultDate: this._state.dateTo,
      onChange: this.#dateToChangeHandler,
      minDate: this._state.dateFrom, //дата, раньше которой нельзя выбрать дату
    });
  }

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(FormEditView.parseStateToPoint(this._state));
  };

  //метод конвертации
  static parsePointToState(eventPoint) {
    const point = { ...eventPoint, isDisabled: false, isSaving: false, isDeleting: false };
    return point;
  }

  static parseStateToPoint(state) {
    delete state.isDisabled;
    delete state.isSaving;
    delete state.isDeleting;
    return { ...state };
  }
}
