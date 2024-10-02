import MainPresenter from './presenter/main-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventPointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';

const filterControlElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const eventPointsModel = new EventPointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter({ container: tripEventsElement, eventPointsModel, offersModel, destinationsModel });
const tripInfoPresenter = new TripInfoPresenter({ container: tripMainElement });

const filterPresenter = new FilterPresenter({
  filterContainer: filterControlElement,
  filterModel,
  eventPointsModel,
});

tripInfoPresenter.init();
filterPresenter.init();
mainPresenter.init();
