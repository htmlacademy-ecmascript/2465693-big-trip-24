import { DESTINATION_LOCATIONS } from '../../const.js';
import { createElement } from '../render.js';

const createDestinationLocationTemplate = (location) => `
<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${location}" list="destination-list-1">
<datalist id="destination-list-1">
  <option value="${location}"></option>;
</datalist>
`;

const createNewDestinationViewTemplate = () => `
<div class="event__field-group  event__field-group--destination">
  <label class="event__label  event__type-output" for="event-destination-1">
    Flight
  </label>
  ${DESTINATION_LOCATIONS.map((location) => createDestinationLocationTemplate(location)).join('')}
</div>
`;

export default class DestinationView {
  getTemplate() {
    return createNewDestinationViewTemplate();
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
