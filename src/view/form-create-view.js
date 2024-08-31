import { createElement } from '../render.js';
import { EventTypeView } from './form-components/event-type-view.js';
import { DestinationView } from './form-components/destination-view.js';
import { TimeView } from './form-components/time-view.js';
import { PriceView } from './form-components/price-view.js';
import { SaveButtonView } from './form-components/save-button-view.js';
import { CancelButtonView } from './form-components/cancel-button-view.js';
import { EventOfferView } from './form-components/event-offer-view.js';
import { EventDestinationView } from './form-components/event-destination-view.js';

const createEventType = new EventTypeView().getTemplate();
const createDestinationView = new DestinationView().getTemplate();
const createTimeView = new TimeView().getTemplate();
const createPriceView = new PriceView().getTemplate();
const createSaveButtonView = new SaveButtonView().getTemplate();
const createCancelButtonView = new CancelButtonView().getTemplate();
const createEventOfferView = new EventOfferView().getTemplate();
const createEventDestinationView = new EventDestinationView().getTemplate();

const createNewFormCreateViewTemplate = () => `
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  ${createEventType};
                  ${createDestinationView};
                  ${createTimeView};
                  ${createPriceView};
                  ${createSaveButtonView};
                  ${createCancelButtonView};
                </header>

                <section class="event__details">
                  ${createEventOfferView};
                  ${createEventDestinationView};
                </section>
              </form>
`;

export default class NewFormCreateView {
  getTemplate() {
    return createNewFormCreateViewTemplate();
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
