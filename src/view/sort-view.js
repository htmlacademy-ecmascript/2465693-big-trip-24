import { SortType } from '../const.js';
import { capitalizeLetter } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = (type) =>
  `<div class="trip-sort__item  trip-sort__item--${type}">
     <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}">
     <label class="trip-sort__btn" for="sort-${type}" data-sort-type="${type}">${capitalizeLetter(type)}</label>
   </div>`;

const createNewSortViewTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${Object.values(SortType)
    .map((type) => createSortItemTemplate(type))
    .join('')};
   </form>`;

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createNewSortViewTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
