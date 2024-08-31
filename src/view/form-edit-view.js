import { createElement } from '../render.js';
import { EventTypeView } from './form-components/event-type-view.js';
import { DestinationView } from './form-components/destination-view.js';
import { TimeView } from './form-components/time-view.js';
import { PriceView } from './form-components/price-view.js';
import { SaveButtonView } from './form-components/save-button-view.js';
import { DeleteButtonView } from './form-components/delete-button-view.js';
import { RollupButton } from './rollup-button-view.js';
import { EventOfferView } from './form-components/event-offer-view.js';
import { EventDestinationView } from './form-components/event-destination-view.js';

const createEventType = new EventTypeView().getTemplate();
const createDestinationView = new DestinationView().getTemplate();
const createTimeView = new TimeView().getTemplate();
const createPriceView = new PriceView().getTemplate();
const createSaveButtonView = new SaveButtonView().getTemplate();
const createDeleteButtonView = new DeleteButtonView().getTemplate();
const createRollupButtonView = new RollupButton().getTemplate();
const createEventOfferView = new EventOfferView().getTemplate();
const createEventDestinationView = new EventDestinationView().getTemplate();

const createNewFormEditViewTemplate = () => `
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  ${createEventType};
                  ${createDestinationView};
                  ${createTimeView};
                  ${createPriceView};
                  ${createSaveButtonView};
                  ${createDeleteButtonView};
                  ${createRollupButtonView};
                </header>

                <section class="event__details">
                  ${createEventOfferView};
                  ${createEventDestinationView};
                </section>
              </form>
`;

export default class FormEditView {
  getTemplate() {
    return createNewFormEditViewTemplate();
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
