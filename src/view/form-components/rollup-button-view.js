import { createElement } from '../../render.js';

const createNewRollupButtonViewTemplate = () => `
<button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
</button>`;

export default class RollupButtonView {
  getTemplate() {
    return createNewRollupButtonViewTemplate();
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
