import FormCreateView from '../view/form-create-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { UpdateType, UserAction, NEW_POINT } from '../const.js';
import { isEscapeKey } from '../utils.js';
export default class NewEventPresenter {
  #eventPoint = NEW_POINT;
  #eventListContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #addComponent = null;

  constructor({ container, offersModel, destinationsModel, onDataChange, onDestroy }) {
    this.#eventListContainer = container;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addComponent !== null) {
      return;
    }
    this.#addComponent = new FormCreateView({
      eventPoint: this.#eventPoint,
      allDestinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      typeOffers: this.#offersModel.getOffersType(),
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
    });

    render(this.#addComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#addComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#addComponent);
    this.#addComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (eventPoint) => {
    this.#handleDataChange(UserAction.ADD_POINT, UpdateType.MAJOR, eventPoint);
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
