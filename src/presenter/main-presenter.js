import FormCreateView from '../view/form-create-view.js';
import FormEditView from '../view/form-edit-view.js';
import LocationPointView from '../view/location-point-view.js';
import SortView from '../view/sort-view';

import { render, RenderPosition } from '../render.js';

export default class MainPresenter {
  constructor({ container, eventPointModel }) {
    this.container = container;
    this.eventPointModel = eventPointModel;
  }

  init() {
    this.eventsListPoints = [...this.eventPointModel.getEventPoint()];

    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(new FormEditView(), this.container, RenderPosition.BEFOREEND);
    render(new FormCreateView(), this.container, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.eventsListPoints.length; i++) {
      render(new LocationPointView({ eventPoint: this.eventsListPoints[i] }), this.container, RenderPosition.BEFOREEND);
    }
  }
}
