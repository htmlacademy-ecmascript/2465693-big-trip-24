import FormCreateView from '../view/form-create-view.js';
import FormEditView from '../view/form-edit-view.js';
import LocationPointView from '../view/location-point-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view';
import { getRandomArrayElement } from '../utils.js';

import { render, RenderPosition } from '../render.js';

export default class MainPresenter {
  eventList = new EventListView();

  constructor({ container, eventPointModel }) {
    this.container = container;
    this.eventPointModel = eventPointModel;
  }

  init() {
    this.eventsListPoints = [...this.eventPointModel.getEventPoint()];

    const editEventPoint = getRandomArrayElement(this.eventsListPoints);
    const formEditView = new FormEditView({
      eventPoint: editEventPoint,
      availableOffers: this.eventPointModel.getOffersByType(editEventPoint.type),
      pointDestination: this.eventPointModel.getDestinationsById(editEventPoint.destination),
      destination: this.eventPointModel.getDestinations(),
      arrayTypeOffers: this.eventPointModel.getOffersType(),
    });

    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.eventList, this.container);
    render(new FormCreateView(), this.eventList.getElement());
    render(formEditView, this.eventList.getElement());

    for (let i = 0; i < this.eventsListPoints.length; i++) {
      const eventPoint = new LocationPointView({
        eventPoint: this.eventsListPoints[i],
        destination: this.eventPointModel.getDestinationsById(this.eventsListPoints[i].destination),
        offers: [...this.eventPointModel.getOffersById(this.eventsListPoints[i].type, this.eventsListPoints[i].offers)],
      });
      render(eventPoint, this.eventList.getElement());
    }
  }
}
