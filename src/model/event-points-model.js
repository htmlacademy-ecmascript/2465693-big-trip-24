import Observable from '../framework/observable.js';
export default class EventPointsModel extends Observable {
  #eventPointsApiService = null;
  #eventPoints = [];

  constructor({ eventPointsApiService }) {
    super();
    this.#eventPointsApiService = eventPointsApiService;
  }

  //метод Init, запрос на получение данных
  async init() {
    try {
      const eventPoints = await this.#eventPointsApiService.eventPoints; //получаем список событий
      this.#eventPoints = eventPoints.map(this.#adaptToClient); //преобразование задач к нужному виду, применяя адаптер
    } catch (err) {
      this.#eventPoints = [];
    }
  }

  get eventPoints() {
    return this.#eventPoints;
  }

  //метод обновления точки события
  updatePoint(updateType, update) {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

    //если сбоите не нашлось то выводим
    //!~index аналог index === -1
    if (!~index) {
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
