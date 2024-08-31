import { createElement } from '../render.js';

const createNewSaveButtonViewTemplate = () => '<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>';

export default class NewSaveButtonView {
  getTemplate() {
    return createNewSaveButtonViewTemplate();
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
