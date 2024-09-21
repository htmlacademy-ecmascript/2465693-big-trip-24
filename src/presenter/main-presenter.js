import { MessageText, SortType } from '../const.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view';
import MessageView from '../view/message-view.js';
import EventPresenter from './event-presenter.js';
import { updateItem, sortByDay, sortByPrice, sortByTime } from '../utils.js';

import { render, RenderPosition } from '../framework/render.js';

export default class MainPresenter {
  #eventList = new EventListView();
  #container = null;
  #eventPointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortComponent = null;
  #messageComponent = new MessageView({ message: MessageText.EVERYTHING });

  #eventListPoints = [];
  #eventPresenters = new Map();

  #currentSortType = SortType.DEFAULT;
  #sourcedEventPoints = [];

  constructor({ container, eventPointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#eventListPoints = [...this.#eventPointsModel.eventPoints];
    this.#sourcedEventPoints = [...this.#eventPointsModel.eventPoints];
    this.#renderSort();
    this.#renderEventsList();
  }

  /**приватный метод для отрисовки компонентов сортировки */
  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  /**приватный метод для отрисовки сообщения на странице */
  #renderMessage() {
    render(this.#messageComponent, this.#container);
  }

  /**приватный метод для очистки точек событий */
  #clearEventPoints() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  /**обработчик изменений в точке события */
  #handleEventPointChange = (updatedEventPoint) => {
    this.#eventListPoints = updateItem(this.#eventListPoints, updatedEventPoint);
    this.#sourcedEventPoints = updateItem(this.#sourcedEventPoints, updatedEventPoint);
    this.#eventPresenters.get(updatedEventPoint.id).init(updatedEventPoint);
  };

  /**приватный метод для отрисовки точки события, принимает объект точки события*/
  #renderEventPoint(eventPointItem) {
    const eventPresenter = new EventPresenter({
      container: this.#eventList.element,
      eventPointsModel: this.#eventPointsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleEventPointChange,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(eventPointItem);
    this.#eventPresenters.set(eventPointItem.id, eventPresenter);
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  /**специфичные методы сортировки */
  #sortEventPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#eventListPoints.sort(sortByDay);
        break;
      case SortType.TIME:
        this.#eventListPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#eventListPoints.sort(sortByPrice);
        break;
      default:
        this.#eventListPoints = [...this.#sourcedEventPoints];
    }

    this.#currentSortType = sortType;
  };

  /**обработчик смены сортировки */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return {};
    }
    this.#sortEventPoints(sortType);
    this.#clearEventPoints();
    this.#renderEventsList();
  };

  /**приватный метод для отрисовки списка событий */
  #renderEventsList() {
    render(this.#eventList, this.#container);

    //проверяем, если событий нет, то выводим сообщение
    if (!this.#eventListPoints.length) {
      this.#renderMessage();
      return;
    }

    for (let i = 0; i < this.#eventListPoints.length; i++) {
      this.#renderEventPoint(this.#eventListPoints[i]);
    }
  }
}
