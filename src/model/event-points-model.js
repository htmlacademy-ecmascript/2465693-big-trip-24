import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
export default class EventPointsModel extends Observable {
  #service = null;
  #eventPoints = [];

  constructor(service) {
    super();
    this.#service = service;
  }

  //метод Init, запрос на получение данных
  async init() {
    try {
      const eventPoints = await this.#service.eventPoints; //получаем список событий
      this.#eventPoints = eventPoints.map(this.#adaptToClient); //преобразование задач к нужному виду, применяя адаптер
    } catch (err) {
      this.#eventPoints = [];
    }
    //уведомляет, что модель обновилась
    this._notify(UpdateType.INIT);
  }

  get eventPoints() {
    return this.#eventPoints;
  }

  //метод обновления точки события
  async updatePoint(updateType, update) {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

    //если сбоите не нашлось то выводим
    //!~index аналог index === -1
    if (!~index) {
      throw new Error('Can not update unexisting point');
    }

    try {
      const response = await this.#service.updatePoint(update);
      const updatePoint = this.#adaptToClient(response);
      this.#eventPoints = [...this.#eventPoints.slice(0, index), updatePoint, ...this.#eventPoints.slice(index + 1)];
      //уведомляем всех подписчиков о случившемся событии
      this._notify(updateType, updatePoint);
    } catch (err) {
      throw new Error('Can not update point');
    }
  }

  //метод добавления новой точки события
  async addPoint(updateType, update) {
    try {
      const response = await this.#service.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#eventPoints = [update, ...this.#eventPoints];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can not add point');
    }
  }

  //метод удаления точки события
  async deletePoint(updateType, update) {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

    //!~index аналог index === -1
    if (!~index) {
      throw new Error('Can not delete unexisting point');
    }

    try {
      await this.#service.deletePoint(update);
      this.#eventPoints = [...this.#eventPoints.slice(0, index), ...this.#eventPoints.slice(index + 1)];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can not delete point');
    }
  }

  //адаптируем данные c сервера snake_case TO camelCase
  #adaptToClient(eventPoint) {
    const adaptedEventPoint = {
      ...eventPoint,
      dateFrom: eventPoint['date_from'] !== null ? new Date(eventPoint['date_from']) : eventPoint['date_from'], // На клиенте дата хранится как экземпляр Date
      dateTo: eventPoint['date_to'] !== null ? new Date(eventPoint['date_to']) : eventPoint['date_to'],
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
