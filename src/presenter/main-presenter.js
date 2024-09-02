import { NUMBER_LOCATION_POINTS } from '../const.js';
import FormCreateView from '../view/form-create-view.js';
import FormEditView from '../view/form-edit-view.js';
import LocationPointView from '../view/location-point-view.js';
import SortView from '../view/sort-view';

import { render, RenderPosition } from '../render.js';

export default class MainPresenter {
  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(new FormEditView(), this.container, RenderPosition.BEFOREEND);
    render(new FormCreateView(), this.container, RenderPosition.BEFOREEND);
    for (let i = 0; i < NUMBER_LOCATION_POINTS; i++) {
      render(new LocationPointView(), this.container, RenderPosition.BEFOREEND);
    }
  }
}
