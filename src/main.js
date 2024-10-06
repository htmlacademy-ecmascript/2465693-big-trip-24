import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import EventPointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import NewEventButtonView from './view/new-event-button-view.js';
import { render } from './framework/render.js';

const tripMainElement = document.querySelector('.trip-main');
const filterControlElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const newEventButtonComponent = new NewEventButtonView({ onButtonClick: handleNewEventButtonClick });

const eventPointsModel = new EventPointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter({ container: tripMainElement });
const filterPresenter = new FilterPresenter({ filterContainer: filterControlElement, filterModel, eventPointsModel });
const mainPresenter = new MainPresenter({
  container: tripEventsElement,
  eventPointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose,
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  mainPresenter.createPoint();
  newEventButtonComponent.element.disabled = true;
}

render(newEventButtonComponent, tripMainElement);

tripInfoPresenter.init();
filterPresenter.init();
mainPresenter.init();
