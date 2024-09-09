import FiltersView from './view/filters-view.js';
import MainPresenter from './presenter/main-presenter.js';
import EventPointModel from './model/event-points-model.js';

import { render } from './render.js';

const filterControlElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const eventPointModel = new EventPointModel();
const mainPresenter = new MainPresenter({ container: tripEventsElement, eventPointModel });

render(new FiltersView(), filterControlElement);
mainPresenter.init();
