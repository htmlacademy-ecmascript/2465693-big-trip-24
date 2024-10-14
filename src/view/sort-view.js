import { SortType, AvailableSortType } from '../const.js';
import { capitalizeLetter } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = (type, checkedSortType) => `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input
      id="sort-${type}"
      class="trip-sort__input visually-hidden"
      type="radio" name="trip-sort"
      data-sort-type="${type}"
      value="sort-${type}"
      ${type === checkedSortType ? 'checked' : ''}
      ${!AvailableSortType[type] ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${type}">${capitalizeLetter(type)}</label>
  </div>`;

const createNewSortViewTemplate = (checkedSortType) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${Object.values(SortType)
    .map((type) => createSortItemTemplate(type, checkedSortType))
    .join('')}
   </form>`;

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #checkedSortType = null;

  constructor({ onSortTypeChange, checkedSortType }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#checkedSortType = checkedSortType;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createNewSortViewTemplate(this.#checkedSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
