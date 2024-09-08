import { NUMBER_LOCATION_POINTS } from '../const.js';
import { getRandomEventPoint } from '../mock/points.js';
import { arrayOffers } from '../mock/offers.js';
import { arrayDestinations } from '../mock/destinations.js';

export default class EventPointModel {
  eventPoint = Array.from({ length: NUMBER_LOCATION_POINTS }, getRandomEventPoint);
  destinations = arrayDestinations;
  offers = arrayOffers;

  getEventPoint() {
    return this.eventPoint;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getOffersType() {
    const availableOffers = this.getOffers();
    const arrayTypeOffers = [];
    for (let i = 0; i < availableOffers.length - 1; i++) {
      arrayTypeOffers.push(availableOffers[i].type);
    }
    return arrayTypeOffers;
  }

  getDestinationsById(id) {
    const availableDestinations = this.getDestinations();
    return availableDestinations.find((item) => item.id === id);
  }

  getOffersByType(type) {
    const availableOffers = this.getOffers();
    return availableOffers.find((item) => item.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }
}
