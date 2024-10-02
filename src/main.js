import FiltersView from './view/filters-view.js';
import MainPresenter from './presenter/main-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import EventPointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';

import { render } from './framework/render.js';

const filterControlElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const eventPointsModel = new EventPointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter({ container: tripEventsElement, eventPointsModel, offersModel, destinationsModel });
const tripInfoPresenter = new TripInfoPresenter({ container: tripMainElement });

const filters = [
  {
    type: 'Everything',
    count: 0,
  },
];

tripInfoPresenter.init();
render(new FiltersView({ filters, currentFilterType: 'Everything', onFilterTypeChange: () => {} }), filterControlElement);
mainPresenter.init();
