import Observable from '../framework/observable.js';
import { NUMBER_LOCATION_POINTS } from '../const.js';
import { getRandomEventPoint } from '../mock/points.js';
export default class EventPointsModel extends Observable {
  #eventPointsApiService = null;
  #eventPoints = Array.from({ length: NUMBER_LOCATION_POINTS }, getRandomEventPoint);

  constructor({ eventPointsApiService }) {
    super();
    this.#eventPointsApiService = eventPointsApiService;
    this.#eventPointsApiService.eventPoints.then((eventPoints) => {
      // eslint-disable-next-line no-console
      console.log(eventPoints.map(this.#adaptToClient));
    });
  }

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

  //адаптируем данные c сервера snake_case TO camelCase
  #adaptToClient(eventPoint) {
    const adaptedEventPoint = {
      ...eventPoint,
      DateFrom: eventPoint['date_from'] !== null ? new Date(eventPoint['date_from']) : eventPoint['date_from'], // На клиенте дата хранится как экземпляр Date
      DateTo: eventPoint['date_to'] !== null ? new Date(eventPoint['date_to']) : eventPoint['date_to'],
      basePrice: eventPoint['base_price'],
      isFavorite: eventPoint['is_favorite'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedEventPoint['date_from'];
    delete adaptedEventPoint['date_to'];
    delete adaptedEventPoint['base_price'];
    delete adaptedEventPoint['is_favorite'];

    return adaptedEventPoint;
  }
}
