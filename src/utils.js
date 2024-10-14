import { FilterType, TimeConverter } from './const.js';
import dayjs from 'dayjs';

const capitalizeLetter = (word) => word[0].toUpperCase() + word.slice(1);

const humanizeEventDueDate = (dueDate, dateFormat) => (dueDate && dateFormat ? dayjs(dueDate).format(dateFormat) : '');

const getDurationEvent = (days, hours, minutes) => {
  let result = '';

  if (days > 0) {
    result += `${days.toString().padStart(2, '0')}D `;
  }

  if ((hours >= 0) & (days >= 0)) {
    result += `${hours.toString().padStart(2, '0')}H `;
  }

  if (minutes >= 0 || (days === 0 && hours === 0)) {
    result += `${minutes.toString().padStart(2, '0')}M `;
  }
  return result;
};

const getDuration = (dateBegin, dateEnd) => {
  const durationInMinutes = dayjs(dateEnd).diff(dateBegin, 'm');
  const days = Math.floor(durationInMinutes / (TimeConverter.HOURS_IN_DAY * TimeConverter.MINUTES_IN_HOUR));
  const hours = Math.floor((durationInMinutes % (TimeConverter.HOURS_IN_DAY * TimeConverter.MINUTES_IN_HOUR)) / TimeConverter.MINUTES_IN_HOUR);
  const minutes = durationInMinutes % TimeConverter.MINUTES_IN_HOUR;

  return getDurationEvent(days, hours, minutes);
};

const isMinoreUpdate = (point, updatePoint) =>
  point.dateFrom !== updatePoint.dateFrom ||
  point.basePrice !== updatePoint.basePrice ||
  getDuration(point.dateFrom, point.dateTo) !== getDuration(updatePoint.dateFrom, updatePoint.dateTo);

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isPastDate = (dueDate) => {
  const currentDate = dayjs();
  const targetDate = dayjs(dueDate);
  return targetDate.isBefore(currentDate);
};

const isPresentDate = (eventPoint) => {
  const currentDate = dayjs();
  const targetStartDate = dayjs(eventPoint.dateFrom);
  const targetEndDate = dayjs(eventPoint.dateTo);
  return currentDate.isAfter(targetStartDate) && currentDate.isBefore(targetEndDate);
};

const isFutureDate = (dueDate) => {
  const currentDate = dayjs();
  const targetDate = dayjs(dueDate);
  return targetDate.isAfter(currentDate);
};

const filter = {
  [FilterType.EVERYTHING]: (eventPoints) => eventPoints,
  [FilterType.FUTURE]: (eventPoints) => eventPoints.filter((eventPoint) => isFutureDate(eventPoint.dateFrom)),
  [FilterType.PRESENT]: (eventPoints) => eventPoints.filter((eventPoint) => isPresentDate(eventPoint)),
  [FilterType.PAST]: (eventPoints) => eventPoints.filter((eventPoint) => isPastDate(eventPoint.dateTo)),
};

const replaceSpaceInName = (string) => {
  const relaceSymbol = /\s+/g;
  return string.replace(relaceSymbol, '-');
};

const sortByDay = (eventA, eventB) => dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom);

const sortByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const sortByTime = (eventA, eventB) => {
  const eventADuration = dayjs(eventA.dateTo).diff(eventA.dateFrom);
  const eventBDuration = dayjs(eventB.dateTo).diff(eventB.dateFrom);

  return eventBDuration - eventADuration;
};

export { capitalizeLetter, humanizeEventDueDate, getDuration, isEscapeKey, filter, replaceSpaceInName, sortByDay, sortByPrice, sortByTime, isMinoreUpdate };
