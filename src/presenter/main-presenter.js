import { MessageText } from '../const.js';
import FormEditView from '../view/form-edit-view.js';
import LocationPointView from '../view/location-point-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view';
import MessageView from '../view/message-view.js';
import { isEscapeKey } from '../utils.js';

import { render, RenderPosition, replace } from '../framework/render.js';

export default class MainPresenter {
  #eventList = new EventListView();
  #container = null;
  #eventPointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortComponent = new SortView();
  #messageComponent = new MessageView({ message: MessageText.EVERYTHING });

  #eventListPoints = [];

  constructor({ container, eventPointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#eventListPoints = [...this.#eventPointsModel.eventPoints];
    this.#renderEventsList();
  }

  /**приватный метод для отрисовки компонентов сортировки */
  #renderSort() {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  /**приватный метод для отрисовки сообщения на странице */
  #renderMessage() {
    render(this.#messageComponent, this.#container);
  }

  /**приватный метод для отрисовки точки события, принимает объект точки события*/
  #renderEventPoints(eventPointItem) {
    /**создание точки */
    const eventPoint = new LocationPointView({
      eventPoint: eventPointItem,
      destination: this.#destinationsModel.getDestinationsById(eventPointItem.destination),
      offers: [...this.#offersModel.getOffersById(eventPointItem.type, eventPointItem.offers)],
      onEditButtonClick,
    });

    /**создание формы редактирования */
    const editEventPoint = new FormEditView({
      eventPoint: eventPointItem,
      availableOffers: this.#offersModel.getOffersByType(eventPointItem.type),
      pointDestination: this.#destinationsModel.getDestinationsById(eventPointItem.destination),
      destination: this.#destinationsModel.destinations,
      arrayTypeOffers: this.#offersModel.getOffersType(),
      onFormSubmit,
      onRollupButtonClick,
    });

    const escKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceEditToView();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    function onEditButtonClick() {
      replaceViewToEdit();
      document.addEventListener('keydown', escKeyDownHandler);
    }
    /**функция replace framework'a , по замене точки на форму редактирования*/
    function replaceViewToEdit() {
      replace(editEventPoint, eventPoint);
    }
    /**функция по замене формы редактирования на точку */
    function onRollupButtonClick() {
      replaceEditToView();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    /**функция смены формы редактирования на просмотр, при нажатии на кнопку Save */
    function onFormSubmit() {
      replaceEditToView();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    /**функция replace framework'a , по замене формы редактирования на просмотр точки */
    function replaceEditToView() {
      replace(eventPoint, editEventPoint);
    }

    render(eventPoint, this.#eventList.element);
  }

  /**приватный метод для отрисовки списка событий */
  #renderEventsList() {
    render(this.#eventList, this.#container);
    this.#renderSort();

    //проверяем, если событий нет, то выводим сообщение
    if (!this.#eventListPoints.length) {
      this.#renderMessage();
      return;
    }

    for (let i = 0; i < this.#eventListPoints.length; i++) {
      this.#renderEventPoints(this.#eventListPoints[i]);
    }
  }
}
