import { getRandomInteger, getRandomArrayElement, getArrayIds, getRandomArrayIdOffers, createRandomIdFromRangeGenerator } from '../utils.js';
import { arrayOffers } from './offers.js';
import { arrayDestinations } from './destinations.js';
import { PricePoint, MAX_ID_COUNT } from './const-mock.js';
import { dateFrom, dateTo } from './date.js';

//генерация случайного уникального id event
const idEvent = createRandomIdFromRangeGenerator(0, MAX_ID_COUNT);

//случайный индекс элемента массива с моковыми данными Offers
const indexItemArrayOffer = getRandomInteger(0, arrayOffers.length - 1);

//массив id offers для выбранного типа
const arrayOffersByType = getArrayIds(arrayOffers[indexItemArrayOffer].offers);

const getRandomEventPoint = () => ({
  id: idEvent(),
  basePrice: getRandomInteger(PricePoint.MIN, PricePoint.MAX),
  dateFrom: dateFrom,
  dateTo: dateTo,
  destination: getRandomArrayElement(getArrayIds(arrayDestinations)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: getRandomArrayIdOffers(arrayOffersByType),
  type: arrayOffers[indexItemArrayOffer].type,
});

export { getRandomEventPoint };
