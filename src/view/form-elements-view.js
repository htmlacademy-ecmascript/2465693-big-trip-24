import { capitalizeLetter, humanizeEventDueDate, replaceSpaceInName } from '../utils.js';
import { DateFormat } from '../const.js';

//выбор типа события
const createTypeItemTemplate = (type, isCheckedTypeClassName) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isCheckedTypeClassName}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeLetter(type)}</label>
  </div>
`;

const createEventTypeTemplate = (type, typeOffers) => {
  const createAvailableTypes = typeOffers
    .map((item) => {
      const isCheckedTypeClassName = item === type ? 'checked' : '';
      return createTypeItemTemplate(item, isCheckedTypeClassName);
    })
    .join('');

  return `
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
    </div>`;
};

//выбор точки события
function createAvailableDestinationTemplateName(destinations) {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

const createDestinationTemplate = (type, destination, destinations) => `
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${capitalizeLetter(type)}
    </label>
    <input class="event__input  event__input--destination"
      id="event-destination-1"
      type="text" name="event-destination"
      value="${destination !== undefined ? destination.name : ''}"
      list="destination-list-1">
    <datalist id="destination-list-1">
      ${createAvailableDestinationTemplateName(destinations)}
    </datalist>
  </div>`;

//выбор даты
const eventTime = (eventDate) => humanizeEventDueDate(eventDate, DateFormat.EDIT_DATE);

const createDateTimeTemplate = (dateFrom, dateTo) => `
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventTime(dateFrom)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventTime(dateTo)}">
  </div>`;

//выбор цены
const createPriceTemplate = (basePrice) => `
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" name="event-price" value="${basePrice}">
  </div>`;

//секция офферов соответствующих типу события
const createOfferItemTemplate = (type, title, price, id, className) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden"
    id="event-offer-${replaceSpaceInName(title)}-1" type="checkbox" name="event-offer-${type}" data-offer-id="${id}" ${className}>
    <label class="event__offer-label" for="event-offer-${replaceSpaceInName(title)}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
`;

const createallOffersByType = (eventPoint, offersByType) =>
  offersByType
    .map((offer) => {
      const isCheckedOfferClassName = eventPoint.offers.includes(offer.id) ? 'checked' : '';

      return createOfferItemTemplate(eventPoint.type, offer.title, offer.price, offer.id, isCheckedOfferClassName);
    })
    .join('');

const createSectionOffersTemplate = (eventPoint, offers) => {
  const offersByType = offers.find((item) => item.type === eventPoint.type).offers;

  return offersByType.length
    ? `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createallOffersByType(eventPoint, offersByType)}
    </div>
  </section>`
    : '';
};

//секция мест назначения
const createPictureTemplate = (pictures) =>
  pictures
    .map(
      (picture) =>
        `
    <img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `
    )
    .join('');

const createSectionDestinationTemplate = (destination) => {
  if (destination === undefined) {
    return '';
  }

  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination !== undefined ? destination.description : ''}</p>
${
  destination.pictures.length
    ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${createPictureTemplate(destination !== undefined ? destination.pictures : '')}
        </div>
       </div>`
    : ''
}
  </section>
  `;
};

export { createEventTypeTemplate, createDestinationTemplate, createDateTimeTemplate, createPriceTemplate, createSectionOffersTemplate, createSectionDestinationTemplate };
