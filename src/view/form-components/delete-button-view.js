import { createElement } from '../render.js';

const createNewDeleteButtonViewTemplate = () => '<button class="event__reset-btn" type="reset">Delete</button>';

export default class DeleteButtonView {
  getTemplate() {
    return createNewDeleteButtonViewTemplate();
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
