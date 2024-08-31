import { EVENT_TYPES } from '../../const.js';
import { capitalizeFletter } from '../utils.js';
import { createElement } from '../render.js';

const createEventTypeItemTemplate = (type) => `
<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFletter(type)}</label>
</div>
`;

const createNewEventTypeViewTemplate = () => `
<div class="event__type-wrapper">
  <label class="event__type  event__type-btn" for="event-type-toggle-1">
    <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
  </label>
  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
     ${EVENT_TYPES.map((type) => createEventTypeItemTemplate(type)).join('')}
    </fieldset>
  </div>
</div>
`;

export default class EventTypeView {
  getTemplate() {
    return createNewEventTypeViewTemplate();
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
