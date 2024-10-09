export default class OffersModel {
  #offers = [];
  #service = null;

  constructor(service) {
    this.#service = service;
  }

  async init() {
    try {
      const offers = await this.#service.offers;
      this.#offers = offers;
    } catch (err) {
      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }

  getOffersType() {
    const availableOffers = this.offers;
    const typeOffers = [];
    for (let i = 0; i < availableOffers.length; i++) {
      typeOffers.push(availableOffers[i].type);
    }
    return typeOffers;
  }

  getOffersByType(type) {
    const availableOffers = this.offers;
    return availableOffers.find((item) => item.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }
}
