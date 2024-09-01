import { createElement } from '../../render';
const createNewCancelButtonViewTemplate = () => '<button class="event__reset-btn" type="reset">Cancel</button>';

export default class CancelButtonView {
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
