import { FILTER_TYPES } from '../const.js';
import { createElement } from '../render.js';
import { capitalizeFletter } from '../utils.js';

const createFiltersItemTemplate = (type) =>
  `<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
    <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFletter(type)}</label>
  </div>`;

const createNewFiltersViewTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
     ${FILTER_TYPES.map((type) => createFiltersItemTemplate(type)).join('')}
   </form>`;

export default class NewFiltersView {
  getTemplate() {
    return createNewFiltersViewTemplate();
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
