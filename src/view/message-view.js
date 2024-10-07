import AbstractView from '../framework/view/abstract-view.js';
import { MessageText } from '../const.js';

const createMessageViewTemplate = (filterType) => {
  const noEventPointTextValue = MessageText[filterType.toUpperCase()];

  return `<p class="trip-events__msg">${noEventPointTextValue}</p>`;
};
export default class MessageView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createMessageViewTemplate(this.#filterType);
  }
}
