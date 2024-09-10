import { arrayOffers } from '../mock/offers.js';

export default class OffersModel {
  offers = arrayOffers;

  getOffers() {
    return this.offers;
  }

  getOffersType() {
    const availableOffers = this.getOffers();
    const arrayTypeOffers = [];
    for (let i = 0; i < availableOffers.length; i++) {
      arrayTypeOffers.push(availableOffers[i].type);
    }
    return arrayTypeOffers;
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
