import { MessageText, SortType } from '../const.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view';
import MessageView from '../view/message-view.js';
import EventPresenter from './event-presenter.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils.js';

import { render, RenderPosition } from '../framework/render.js';

export default class MainPresenter {
  #eventList = new EventListView();
  #container = null;
  #eventPointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortComponent = null;
  #messageComponent = new MessageView({ message: MessageText.EVERYTHING });

  #eventPresenters = new Map();

  #currentSortType = SortType.DAY;

  constructor({ container, eventPointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    //подписка на изменение модели
    this.#eventPointsModel.addObserver(this.#handleModelEvent);
  }

  get eventPoints() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#eventPointsModel.eventPoints].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#eventPointsModel.eventPoints].sort(sortByPrice);
    }
    return [...this.#eventPointsModel.eventPoints].sort(sortByDay);
  }

  init() {
    this.#renderSort();
    this.#renderEventsList();
  }

  /**приватный метод для отрисовки компонентов сортировки */
  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      checkedSortType: this.#currentSortType,
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
    //Здесь будем вызывать обновление модели
    this.#eventPresenters.get(updatedEventPoint.id).init(updatedEventPoint);
  };

  /**приватный метод для отрисовки точки события, принимает объект точки события*/
  #renderEventPoint(eventPointItem) {
    const eventPresenter = new EventPresenter({
      container: this.#eventList.element,
      eventPointsModel: this.#eventPointsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(eventPointItem);
    this.#eventPresenters.set(eventPointItem.id, eventPresenter);
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  /**обработчик реагирующий на действия пользователя, Здесь будем вызывать обновление модели.
   * @actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
   * @updateType - тип изменений, нужно чтобы понять, что после нужно обновить
   * @update обновленные данные
   */
  #handleViewAction = (actionType, updateType, update) => {
    // eslint-disable-next-line no-console
    console.log(actionType, updateType, update);
  };

  /**обработчик срабатывающий при изменении модели. В зависимости от типа изменений решаем, что делать:
   *- обновить часть списка (например,напр. когда поменялся Destination )
   *- обновить список (например, когда cj,snbt удалено или добавилось новое)
   *- обновить всю доску (например, при переключении фильтра)
   */
  #handleModelEvent = (updateType, data) => {
    // eslint-disable-next-line no-console
    console.log(updateType, data);
  };

  /**обработчик смены сортировки */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return {};
    }

    this.#currentSortType = sortType;
    this.#clearEventPoints();
    this.#renderEventsList();
  };

  #renderEventPoints(eventPoints) {
    eventPoints.forEach((eventPoint) => this.#renderEventPoint(eventPoint));
  }

  /**приватный метод для отрисовки списка событий */
  #renderEventsList() {
    render(this.#eventList, this.#container);

    //проверяем, если событий нет, то выводим сообщение
    if (!this.eventPoints.length) {
      this.#renderMessage();
      return;
    }

    this.#renderEventPoints(this.eventPoints);
  }
}
