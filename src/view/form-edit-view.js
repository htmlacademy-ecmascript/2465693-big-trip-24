import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeLetter, humanizeTaskDueDate } from '../utils.js';

const createOfferItemTemplate = (type, title, price, className) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" ${className}>
    <label class="event__offer-label" for="event-offer-${type}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
`;

const createTypeItemTemplate = (type) => `
  <div class="event__type-item">
    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeLetter(type)}</label>
  </div>
`;

const createDestinationNameTemplate = (nameItem) => `<option value="${nameItem}"></option>`;

const createNewFormEditViewTemplate = (eventPoint, availableOffers, pointDestination, destination, arrayTypeOffers) => {
  const eventTime = (eventDate) => humanizeTaskDueDate(eventDate, DateFormat.EDIT_DATE);
  const destinationName = pointDestination.name;
  const createAvailableOffers = availableOffers.offers
    .map((offer) => {
      const isCheckedOfferClassName = eventPoint.offers.includes(offer.id) ? 'checked' : '';

      return createOfferItemTemplate(availableOffers.type, offer.title, offer.price, isCheckedOfferClassName);
    })
    .join('');

  const createAvailableTypes = arrayTypeOffers
    .map((type) => {
      const isCheckedTypeClassName = type === capitalizeLetter(eventPoint.type) ? 'checked' : '';
      return createTypeItemTemplate(type, isCheckedTypeClassName);
    })
    .join('');

  const createAvailableDestinationName = destination.map((destinationItem) => createDestinationNameTemplate(destinationItem.name)).join('');

  return `
            <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${eventPoint.type}.png" alt="Event type icon">
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
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${capitalizeLetter(eventPoint.type)}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${createAvailableDestinationName}
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventTime(eventPoint.dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventTime(eventPoint.dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventPoint.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${createAvailableOffers}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${pointDestination.description}</p>
                  </section>
                </section>
              </form>
            </li>`;
};

export default class FormEditView extends AbstractView {
  #eventPoint = null;
  #availableOffers = null;
  #pointDestination = null;
  #destination = null;
  #arrayTypeOffers = null;

  constructor({ eventPoint, availableOffers, pointDestination, destination, arrayTypeOffers }) {
    /**super вызывает конструктор родительского класса*/
    super();
    this.#eventPoint = eventPoint;
    this.#availableOffers = availableOffers;
    this.#pointDestination = pointDestination;
    this.#destination = destination;
    this.#arrayTypeOffers = arrayTypeOffers;
  }

  get template() {
    return createNewFormEditViewTemplate(this.#eventPoint, this.#availableOffers, this.#pointDestination, this.#destination, this.#arrayTypeOffers);
  }
}
