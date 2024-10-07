import Observable from '../framework/observable.js';
import { NUMBER_LOCATION_POINTS } from '../const.js';
import { getRandomEventPoint } from '../mock/points.js';
export default class EventPointsModel extends Observable {
  #eventPoints = Array.from({ length: NUMBER_LOCATION_POINTS }, getRandomEventPoint);

  get eventPoints() {
    return this.#eventPoints;
  }

  //метод обновления точки события
  updatePoint(updateType, update) {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

    //если сбоите не нашлось то выводим
    if (index === -1) {
      throw new Error('Can not update unexisting point');
    }

    this.#eventPoints = [...this.#eventPoints.slice(0, index), update, ...this.#eventPoints.slice(index + 1)];
    //уведомляем всех подписчиков о случившемся событии
    this._notify(updateType, update);
  }

  //метод добавления новой точки события
  addEventPoint(updateType, update) {
    this.#eventPoints = [update, ...this.#eventPoints];

    this._notify(updateType, update);
  }

  //метод удаления точки события
  deletePoint(updateType, update) {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

    //!~index аналог index === -1
    if (!~index) {
      throw new Error('Can not delete unexisting point');
    }

    this.#eventPoints = [...this.#eventPoints.slice(0, index), ...this.#eventPoints.slice(index + 1)];

    this._notify(updateType);
  }
}
