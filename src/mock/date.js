import { getRandomInteger } from '../utils.js';
import dayjs from 'dayjs';

const Date = {
  YEAR: {
    MIN: 2020,
    MAX: 2025,
  },
  MONTH: {
    MIN: 0,
    MAX: 11,
  },
  DAY: {
    MIN: 1,
    MAX: 28,
  },
  HOUR: {
    MIN: 0,
    MAX: 23,
  },
  MINUTE: {
    MIN: 0,
    MAX: 59,
  },
  SECOND: {
    MIN: 0,
    MAX: 59,
  },
};

const generateDateFrom = () => {
  const newDateFrom = dayjs()
    .year(getRandomInteger(Date.YEAR.MIN, Date.YEAR.MAX))
    .month(getRandomInteger(Date.MONTH.MIN, Date.MONTH.MAX))
    .day(getRandomInteger(Date.DAY.MIN, Date.DAY.MAX))
    .hour(getRandomInteger(Date.HOUR.MIN, Date.HOUR.MAX))
    .minute(getRandomInteger(Date.MINUTE.MIN, Date.MINUTE.MAX))
    .second(getRandomInteger(Date.SECOND.MIN, Date.SECOND.MAX));
  return newDateFrom;
};

const dateFrom = generateDateFrom();

const generateDateTo = (dataValue) => {
  const newDateTo = dayjs(dataValue)
    .add(getRandomInteger(Date.DAY.MIN, Date.DAY.MAX), 'day')
    .add(getRandomInteger(Date.HOUR.MIN, Date.HOUR.MAX), 'hour')
    .add(getRandomInteger(Date.MINUTE.MIN, Date.MINUTE.MAX), 'minute')
    .add(getRandomInteger(Date.SECOND.MIN, Date.SECOND.MAX), 'second');
  return newDateTo;
};

const dateTo = generateDateTo(dateFrom);

export { dateFrom, dateTo };
