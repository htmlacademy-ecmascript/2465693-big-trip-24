import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
export default class EventPointsModel extends Observable {
  #service = null;
  #eventPoints = [];
  #offersModel = null;
  #destinationsModel = null;

  constructor(service, offersModel, destinayionsModel) {
    super();
    this.#service = service;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinayionsModel;
  }

  get eventPoints() {
    return this.#eventPoints;
  }

  async init() {
    try {
      await Promise.all([this.#destinationsModel.init(), this.#offersModel.init()]);
      const eventPoints = await this.#service.eventPoints;
      this.#eventPoints = eventPoints.map(this.#adaptToClient);
      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#eventPoints = [];
      this._notify(UpdateType.ERROR);
    }
  }

  async updatePoint(updateType, update) {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

    if (!~index) {
      throw new Error('Can not update unexisting point');
    }

    try {
      const response = await this.#service.updatePoint(update);
      const updatePoint = this.#adaptToClient(response);
      this.#eventPoints = [...this.#eventPoints.slice(0, index), updatePoint, ...this.#eventPoints.slice(index + 1)];
      this._notify(updateType, updatePoint);
    } catch (err) {
      throw new Error('Can not update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#service.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#eventPoints = [newPoint, ...this.#eventPoints];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can not add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

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

  #adaptToClient(eventPoint) {
    const adaptedEventPoint = {
      ...eventPoint,
      dateFrom: eventPoint['date_from'] !== null ? new Date(eventPoint['date_from']) : eventPoint['date_from'],
      dateTo: eventPoint['date_to'] !== null ? new Date(eventPoint['date_to']) : eventPoint['date_to'],
      basePrice: eventPoint['base_price'],
      isFavorite: eventPoint['is_favorite'],
    };

    delete adaptedEventPoint['date_from'];
    delete adaptedEventPoint['date_to'];
    delete adaptedEventPoint['base_price'];
    delete adaptedEventPoint['is_favorite'];

    return adaptedEventPoint;
  }
}
