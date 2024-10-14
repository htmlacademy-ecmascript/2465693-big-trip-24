import AbstractView from '../framework/view/abstract-view';
import { DateFormat, TRIP_DESTINATION_COUNT } from '../const.js';
import { sortByDay, humanizeEventDueDate } from '../utils';

const getDestinationRoute = (eventPoints, destinations) => {
  const sortedEventPoints = [...eventPoints.sort(sortByDay)];
  const destinationIds = sortedEventPoints.map((eventPoint) => eventPoint.destination);
  const destinationsRoute = destinationIds.map((id) => {
    const destinationRoute = destinations.find((destination) => destination.id === id);
    return destinationRoute ? destinationRoute.name : '';
  });

  let route = '';

  if (destinationsRoute.length > TRIP_DESTINATION_COUNT) {
    route = `${destinationsRoute[0]} &mdash; ... &mdash; ${destinationsRoute[destinationsRoute.length - 1]}`;
  } else {
    route = destinationsRoute.join(' &mdash; ');
  }

  return route;
};

const getDateTemplate = (eventPoints) => {
  const sortedEventPoints = [...eventPoints.sort(sortByDay)];
  const datesStart = sortedEventPoints.map((eventPoint) => eventPoint.dateFrom);
  const datesEnd = sortedEventPoints.map((eventPoint) => eventPoint.dateTo);

  return `
  <p class="trip-info__dates">
  ${humanizeEventDueDate(datesStart[0], DateFormat.TRIP_INFO)}
  &nbsp;&mdash;&nbsp;
  ${humanizeEventDueDate(datesEnd[sortedEventPoints.length - 1], DateFormat.TRIP_INFO)}
  </p>
  `;
};

const costOffersPrice = (eventPoint, offers) => {
  const OffersByType = offers.find((offer) => eventPoint.type === offer.type);
  const selectedOffers = OffersByType.offers.filter((offer) => eventPoint.offers.includes(offer.id));
  return selectedOffers.reduce((costOffers, offer) => costOffers + offer.price, 0);
};

const getCostTrip = (eventPoints, offers) =>
  eventPoints.reduce((cost, eventPoint) => {
    cost += eventPoint.basePrice + costOffersPrice(eventPoint, offers);
    return cost;
  }, 0);

const getCostTripTemplate = (eventPoints, offers) =>
  `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getCostTrip(eventPoints, offers)}</span>
      </p>`;

const createNewTripInfoViewTemplate = ({ eventPoints, destinations, offers, isEventPointLength }) =>
  `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${isEventPointLength ? getDestinationRoute(eventPoints, destinations) : ''}</h1>
        ${isEventPointLength ? getDateTemplate(eventPoints) : ''}
      </div>
      ${isEventPointLength ? getCostTripTemplate(eventPoints, offers) : ''}
    </section>`;

export default class TripInfoView extends AbstractView {
  #eventPoints = [];
  #destinations = null;
  #offers = null;

  constructor({ eventPoints, destinations, offers }) {
    super();
    this.#eventPoints = eventPoints;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    let isEventPointLength = false;
    if (this.#eventPoints.length > 0) {
      isEventPointLength = true;
    }
    return createNewTripInfoViewTemplate({ eventPoints: this.#eventPoints, destinations: this.#destinations, offers: this.#offers, isEventPointLength });
  }
}
