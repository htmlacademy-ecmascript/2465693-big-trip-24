import { FILTER_TYPES } from '../const.js';
import { capitalizeLetter } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createFiltersItemTemplate = (type) =>
  `<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
    <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeLetter(type)}</label>
  </div>`;

const createNewFiltersViewTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
     ${FILTER_TYPES.map((type) => createFiltersItemTemplate(type)).join('')}
   </form>`;

export default class FiltersView extends AbstractView {
  get template() {
    return createNewFiltersViewTemplate();
  }
}
