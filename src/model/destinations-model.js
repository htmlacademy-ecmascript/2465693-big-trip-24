import { UpdateType } from '../const';
export default class DestinationsModel {
  #destinations = [];
  #eventPointsApiService = null;

  constructor({ eventPointsApiService }) {
    this.#eventPointsApiService = eventPointsApiService;
  }

  async init() {
    try {
      const destinations = await this.#eventPointsApiService.destinations;
      this.#destinations = destinations;
    } catch (err) {
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationsById(id) {
    const availableDestinations = this.#destinations;
    return availableDestinations.find((item) => item.id === id);
  }
}
