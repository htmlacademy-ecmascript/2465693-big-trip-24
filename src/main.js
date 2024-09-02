import FiltersView from './view/filters-view.js';
import MainPresenter from './presenter/main-presenter.js';

import { render } from './render.js';

const filterControlElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const mainPresenter = new MainPresenter({ container: tripEventsElement });

render(new FiltersView(), filterControlElement);
mainPresenter.init();
