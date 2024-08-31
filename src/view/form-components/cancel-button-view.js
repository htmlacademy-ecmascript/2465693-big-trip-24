import { createElement } from '../render.js';

const createNewCancelButtonViewTemplate = () => '<button class="event__reset-btn" type="reset">Delete</button>';

export default class NewCancelButtonView {
  getTemplate() {
    return createNewCancelButtonViewTemplate();
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
