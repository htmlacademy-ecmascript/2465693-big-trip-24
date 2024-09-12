import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTaskDueDate, getDuration } from '../utils.js';

const createNewLocationPointTemplate = (eventPoint, destination, offers) => {
  const { basePrice, dateFrom, dateTo, isFavorite, type } = eventPoint;
  const isFavoriteClass = isFavorite ? 'event__favorite-btn--active' : '';
  const durationEvent = getDuration(dateFrom, dateTo);

  const createEventOfferTemplate = (title, price) =>
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;

  const createEventOffers = offers.map((offer) => createEventOfferTemplate(offer.title, offer.price)).join('');

  return `
  <li class="trip-events__item">
  <div class="event">
  <time class="event__date" datetime="${dateFrom}">${humanizeTaskDueDate(dateFrom, DateFormat.EVENT_DATE)}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${type} ${destination.name}</h3>
  <div class="event__schedule">
    <p class="event__time">
    <time class="event__start-time" datetime="${dateFrom}">${humanizeTaskDueDate(dateFrom, DateFormat.EVENT_TIME)}</time>
    &mdash;
    <time class="event__end-time" datetime="${dateTo}">${humanizeTaskDueDate(dateTo, DateFormat.EVENT_TIME)}</time>
    </p>
    <p class="event__duration">${durationEvent}</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
  ${createEventOffers}
  </ul>
  <button class="event__favorite-btn ${isFavoriteClass}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
</li>`;
};
export default class LocationPointView extends AbstractView {
  #eventPoint = null;
  #destination = null;
  #offers = null;
  #handleEditButtonClick = null;
  constructor({ eventPoint, destination, offers, onEditButtonClick }) {
    /**super вызывает конструктор родительского класса*/
    super();
    this.#eventPoint = eventPoint;
    this.#destination = destination;
    this.#offers = offers;
    /**сохраняем ссылку которую мы получаем в onEditButtonClick */
    this.#handleEditButtonClick = onEditButtonClick;
    /**ссылка на элемент event-point */
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#EditButtonClickHandler);
  }

  get template() {
    return createNewLocationPointTemplate(this.#eventPoint, this.#destination, this.#offers);
  }

  #EditButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditButtonClick();
  };
}
