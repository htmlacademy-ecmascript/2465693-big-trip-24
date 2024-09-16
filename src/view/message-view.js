import AbstractView from '../framework/view/abstract-view.js';

const createMessageViewTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class MessageView extends AbstractView {
  #message = null;

  constructor({ message }) {
    super();
    this.#message = message;
  }

  get template() {
    return createMessageViewTemplate(this.#message);
  }
}
