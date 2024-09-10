import { arrayDestinations } from '../mock/destinations.js';

export default class DestinationsModel {
  destinations = arrayDestinations;

  getDestinations() {
    return this.destinations;
  }

  getDestinationsById(id) {
    const availableDestinations = this.getDestinations();
    return availableDestinations.find((item) => item.id === id);
  }
}
