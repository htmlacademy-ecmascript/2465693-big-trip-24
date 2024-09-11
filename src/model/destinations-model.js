import { arrayDestinations } from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = arrayDestinations;

  get destinations() {
    return this.#destinations;
  }

  getDestinationsById(id) {
    const availableDestinations = this.#destinations;
    return availableDestinations.find((item) => item.id === id);
  }
}
