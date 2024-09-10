import FiltersView from './view/filters-view.js';
import MainPresenter from './presenter/main-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import EventPointModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

import { render } from './render.js';

const filterControlElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const eventPointModel = new EventPointModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const mainPresenter = new MainPresenter({ container: tripEventsElement, eventPointModel, offersModel, destinationsModel });
const tripInfoPresenter = new TripInfoPresenter({ container: tripMainElement });

tripInfoPresenter.init();
render(new FiltersView(), filterControlElement);
mainPresenter.init();
