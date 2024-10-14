import { render, remove, RenderPosition } from '../framework/render.js';
import FormCreateView from '../view/form-create-view.js';
import { UpdateType, UserAction, NEW_POINT } from '../const.js';
import { isEscapeKey } from '../utils.js';
export default class NewEventPresenter {
  #eventPoint = NEW_POINT;
  #eventListContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #handleReset = null;
  #addComponent = null;

  constructor({ eventContainer, offersModel, destinationsModel, onDataChange, onDestroy, onReset }) {
    this.#eventListContainer = eventContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#handleReset = onReset;
  }

  init() {
    if (this.#addComponent !== null) {
      return;
    }
    this.#addComponent = new FormCreateView({
      eventPoint: this.#eventPoint,
      destinations: this.#destinationsModel.destinations,
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
    this.#handleReset();

    remove(this.#addComponent);
    this.#addComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#addComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#addComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#addComponent.shake(resetFormState);
  }

  #handleFormSubmit = (eventPoint) => {
    this.#handleDataChange(UserAction.ADD_POINT, UpdateType.MAJOR, eventPoint);
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
