export default class DestinationsModel {
  #destinations = [];
  #service = null;

  constructor(service) {
    this.#service = service;
  }

  async init() {
    try {
      const destinations = await this.#service.destinations;
      this.#destinations = destinations;
    } catch (err) {
      this.#destinations = [];
    }
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationsById(id) {
    const availableDestinations = this.#destinations;
    return availableDestinations.find((item) => item.id === id);
  }
}
