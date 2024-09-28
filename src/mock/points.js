import { getRandomInteger, getRandomArrayElement, getArrayIds, getRandomArrayIdOffers } from '../utils.js';
import { arrayOffers } from './offers.js';
import { destinations } from './destinations.js';
import { PricePoint } from './const-mock.js';
import { dateFrom, dateTo } from './date.js';
import { nanoid } from 'nanoid';

const getRandomEventPoint = () => {
  //случайный индекс элемента массива с моковыми данными Offers
  const indexItemArrayOffer = getRandomInteger(0, arrayOffers.length - 1);
  //массив id offers для выбранного типа
  const arrayOffersByType = getArrayIds(arrayOffers[indexItemArrayOffer].offers);
  const startDate = dateFrom();

  return {
    id: nanoid(),
    basePrice: getRandomInteger(PricePoint.MIN, PricePoint.MAX),
    dateFrom: startDate,
    dateTo: dateTo(startDate),
    destination: getRandomArrayElement(getArrayIds(destinations)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getRandomArrayIdOffers(arrayOffersByType),
    type: arrayOffers[indexItemArrayOffer].type,
  };
};

export { getRandomEventPoint };
