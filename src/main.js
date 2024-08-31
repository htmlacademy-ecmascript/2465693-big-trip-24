import FiltersView from './view/filters-view.js';
import { render } from './render.js';

const filterControlElement = document.querySelector('.trip-controls__filters');

render(new FiltersView(), filterControlElement);
