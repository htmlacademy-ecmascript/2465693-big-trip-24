import { SortType, UpdateType, UserAction, FilterType, TimeLimit } from '../const.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view';
import MessageView from '../view/message-view.js';
import LoadingView from '../view/loading-view.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { sortByDay, sortByPrice, sortByTime, filter } from '../utils.js';

import { render, RenderPosition, remove } from '../framework/render.js';

export default class MainPresenter {
  #eventsContainer = null;
  #eventPointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #messageComponent = null;
  #Loadingcomponent = new LoadingView();

  #eventsList = new EventsListView();
  #eventPresenter = new Map();
  #newEventPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({ eventsContainer, eventPointsModel, offersModel, destinationsModel, filterModel, onNewEventDestroy }) {
    this.#eventsContainer = eventsContainer;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      eventContainer: this.#eventsList.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy,
      onReset: this.#handleFormReset,
    });

    //подписка на изменение модели
    this.#eventPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get eventPoints() {
    this.#filterType = this.#filterModel.filter;
    const eventPoints = this.#eventPointsModel.eventPoints;
    const filteredPoints = filter[this.#filterType](eventPoints);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints.sort(sortByDay);
  }

  init() {
    this.#renderPage();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterType = FilterType.EVERYTHING;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init();
    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }
  }

  /**приватный метод для отрисовки компонентов сортировки */
  #renderSort() {
    this.#sortComponent = new SortView({
      checkedSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  /**приватный метод для отрисовки сообщения на странице */
  #renderMessage() {
    this.#messageComponent = new MessageView({
      filterType: this.#filterType,
    });
    render(this.#messageComponent, this.#eventsContainer);
  }

  #renderError() {
    this.#messageComponent = new MessageView({
      filterType: 'ERROR',
    });
    render(this.#messageComponent, this.#eventsContainer);
  }

  /**приватный метод для отрисовки точки события, принимает объект точки события*/
  #renderEventPoint(eventPointItem) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsList.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(eventPointItem);
    this.#eventPresenter.set(eventPointItem.id, eventPresenter);
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearPage({ resetSortType = false } = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#Loadingcomponent);
    remove(this.#sortComponent);
    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  /**обработчик реагирующий на действия пользователя, Здесь будем вызывать обновление модели.
   * @actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
   * @updateType - тип изменений, нужно чтобы понять, что после нужно обновить
   * @update обновленные данные
   */
  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventPresenter.get(update.id).setSaving();
        try {
          await this.#eventPointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#eventPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventPointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#eventPresenter.get(update.id).setDeleting();
        try {
          await this.#eventPointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#eventPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  /**обработчик срабатывающий при изменении модели. В зависимости от типа изменений решаем, что делать:
   *- обновить часть списка (например, когда поменялся Destination )
   *- обновить список (например, когда событие удалено или добавилось новое)
   *- обновить всю доску (например, при переключении фильтра)
   */
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPage();
        this.#renderPage();
        break;
      case UpdateType.MAJOR:
        this.#clearPage({ resetSortType: true });
        this.#renderPage();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#Loadingcomponent);
        this.#renderPage();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#Loadingcomponent);
        this.#renderError();
    }
  };

  /**обработчик смены сортировки */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return {};
    }

    this.#currentSortType = sortType;
    this.#clearPage();
    this.#renderPage();
  };

  #handleFormReset = () => {
    if (this.eventPoints.length === 0) {
      remove(this.#sortComponent);
      this.#renderMessage();
    }
  };

  #renderEventPoints(eventPoints) {
    eventPoints.forEach((eventPoint) => this.#renderEventPoint(eventPoint));
  }

  #renderLoading() {
    render(this.#Loadingcomponent, this.#eventsContainer);
  }

  /**приватный метод для отрисовки списка событий */
  #renderEventsList() {
    render(this.#eventsList, this.#eventsContainer);
    this.#renderEventPoints(this.eventPoints);
  }

  #renderPage() {
    //показ что идет процесс загрузки
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    //проверяем, если событий нет, то выводим сообщение, о необходимости добавить событие
    if (!this.eventPoints.length) {
      this.#renderMessage();
      render(this.#eventsList, this.#eventsContainer);
      return;
    }

    this.#renderSort();
    this.#renderEventsList();
  }
}
