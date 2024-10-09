import AbstractView from '../framework/view/abstract-view';

const createNoEventPointTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class LoadingView extends AbstractView {
  get template() {
    return createNoEventPointTemplate();
  }
}
