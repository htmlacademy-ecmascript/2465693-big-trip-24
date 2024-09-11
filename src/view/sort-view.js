import { SORT_TYPES } from '../const.js';
import { capitalizeLetter } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = (type) =>
  `<div class="trip-sort__item  trip-sort__item--${type}">
     <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}">
     <label class="trip-sort__btn" for="sort-${type}">${capitalizeLetter(type)}</label>
   </div>`;

const createNewSortViewTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
     ${SORT_TYPES.map((type) => createSortItemTemplate(type)).join('')}
   </form>`;

export default class SortView extends AbstractView {
  get template() {
    return createNewSortViewTemplate();
  }
}
