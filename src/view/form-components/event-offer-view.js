import { OFFER_SELECTORS } from '../../const.js';
import { createElement } from '../../render.js';

const createEventOfferItemTemplate = ({ id, checkbox, title, price }) => `
<div class="event__available-offers">
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-luggage" ${checkbox ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;

const createNewEventOfferViewTemplate = () => `

<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

  <div class="event__available-offers">
  ${OFFER_SELECTORS.map((item) => createEventOfferItemTemplate(item)).join('')}
  </div>
</section>`;

export default class EventOfferView {
  getTemplate() {
    return createNewEventOfferViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
