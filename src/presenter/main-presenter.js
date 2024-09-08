import FormCreateView from '../view/form-create-view.js';
import FormEditView from '../view/form-edit-view.js';
import LocationPointView from '../view/location-point-view.js';
import SortView from '../view/sort-view';
import { getRandomArrayElement } from '../utils.js';

import { render, RenderPosition } from '../render.js';

export default class MainPresenter {
  constructor({ container, eventPointModel }) {
    this.container = container;
    this.eventPointModel = eventPointModel;
  }

  init() {
    this.eventsListPoints = [...this.eventPointModel.getEventPoint()];

    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    const editEventPoint = getRandomArrayElement(this.eventsListPoints);
    const formEditView = new FormEditView({
      eventPoint: editEventPoint,
      availableOffers: this.eventPointModel.getOffersByType(editEventPoint.type),
      pointDestination: this.eventPointModel.getDestinationsById(editEventPoint.destination),
      destination: this.eventPointModel.getDestinations(),
      arrayTypeOffers: this.eventPointModel.getOffersType(),
    });
    render(formEditView, this.container, RenderPosition.BEFOREEND);
    render(new FormCreateView(), this.container, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.eventsListPoints.length; i++) {
      const eventPoint = new LocationPointView({
        eventPoint: this.eventsListPoints[i],
        destination: this.eventPointModel.getDestinationsById(this.eventsListPoints[i].destination),
        offers: [...this.eventPointModel.getOffersById(this.eventsListPoints[i].type, this.eventsListPoints[i].offers)],
      });
      render(eventPoint, this.container, RenderPosition.BEFOREEND);
    }
  }
}
