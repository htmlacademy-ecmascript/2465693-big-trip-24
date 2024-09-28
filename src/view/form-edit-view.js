import { DateFormat } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizeLetter, humanizeEventDueDate, replaceSpaceInName } from '../utils.js';
import dayjs from 'dayjs';

const createOfferItemTemplate = (type, title, price, className) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${replaceSpaceInName(title)}-1" type="checkbox" name="event-offer-${type}" ${className}>
    <label class="event__offer-label" for="event-offer-${replaceSpaceInName(title)}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
`;

const createTypeItemTemplate = (type, isCheckedTypeClassName) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isCheckedTypeClassName}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeLetter(type)}</label>
  </div>
`;

function createAvailableDestinationTemplateName(destinations) {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

//получаем массив типов всех offer
const getOffersType = (offers) => {
  const offersType = [];
  for (let i = 0; i < offers.length; i++) {
    offersType.push(offers[i].type);
  }
  return offersType;
};

const createPictureTemplate = (pictures) =>
  pictures
    .map(
      (picture) =>
        `
    <img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `
    )
    .join('');

const createNewFormEditViewTemplate = ({ eventPoint, offers, destinations }) => {
  const { type, basePrice, dateFrom, dateTo } = eventPoint;
  const destination = destinations.find((item) => item.id === eventPoint.destination);
  const { id, name, description, pictures } = destination;

  const offersByType = offers.find((item) => item.type === type).offers;
  const typeOffers = getOffersType(offers);

  const createAvailableTypes = typeOffers
    .map((item) => {
      const isCheckedTypeClassName = item === type ? 'checked' : '';
      return createTypeItemTemplate(item, isCheckedTypeClassName);
    })
    .join('');

  const eventTime = (eventDate) => humanizeEventDueDate(eventDate, DateFormat.EDIT_DATE);

  const createallOffersByType = offersByType
    .map((offer) => {
      const isCheckedOfferClassName = eventPoint.offers.includes(offer.id) ? 'checked' : '';

      return createOfferItemTemplate(type, offer.title, offer.price, isCheckedOfferClassName);
    })
    .join('');

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createAvailableTypes}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${capitalizeLetter(type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createAvailableDestinationTemplateName(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventTime(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
${
  offersByType.length
    ? `
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${createallOffersByType}
            </div>
          </section>
          `
    : ''
}
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
${
  pictures.length
    ? `
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${createPictureTemplate(pictures)}
              </div>
            </div>
      `
    : ''
}
                  </section>
                </section>
              </form>
            </li>`;
};

export default class FormEditView extends AbstractStatefulView {
  #eventPoint = null;
  #allOffersByType = null;
  #pointDestination = null;
  #allDestinations = [];
  #allOffers = [];

  #handleFormSubmit = null;
  #handleRollupButtonClick = null;

  constructor({ eventPoint, allDestinations, allOffers, allOffersByType, onFormSubmit, onRollupButtonClick }) {
    /**super вызывает конструктор родительского класса*/
    super();
    this._setState(FormEditView.parsePointToState(eventPoint));
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#allOffersByType = allOffersByType;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this._restoreHandlers();
  }

  get template() {
    return createNewFormEditViewTemplate({
      eventPoint: this._state,
      destinations: this.#allDestinations,
      offers: this.#allOffers,
    });
  }

  reset(point) {
    this.updateElement(FormEditView.parsePointToState(point));
    return createNewFormEditViewTemplate(this.#allDestinations, this.#pointDestination, this.#eventPoint, this.#allOffers);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('.event__save-btn').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeOptionHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationOptionHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);

    const offersElement = this.element.querySelector('.event__available-offers');
    if (offersElement) {
      offersElement.addEventListener('change', this.#offersChangeHandler);
    }
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditView.parseStateToPoint(this._state));
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #typeOptionHandler = (evt) => {
    this.updateElement({ type: evt.target.value, allOffers: [] });
  };

  #destinationOptionHandler = (evt) => {
    const selectedDestination = this.#allDestinations.find((item) => item.name === evt.target.value);
    const selectedDestinationId = selectedDestination ? selectedDestination.id : null;
    this.updateElement({ destination: selectedDestinationId });
  };

  #offersChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({ offers: selectedOffers.map((offer) => offer.dataset.offerId) });
  };

  #priceInputHandler = (evt) => {
    this._setState({ basePrice: evt.target.value });
  };

  static parsePointToState(eventPoint) {
    if (eventPoint.dateFrom instanceof dayjs) {
      const dateFrom = eventPoint.dateFrom.toDate();
      const dateTo = eventPoint.dateTo.toDate();
      return { ...eventPoint, dateFrom: dateFrom, dateTo: dateTo };
    }
    return { ...eventPoint };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
