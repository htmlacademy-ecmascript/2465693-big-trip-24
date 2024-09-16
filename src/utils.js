import { TimeConverter } from './const.js';
import dayjs from 'dayjs';
import { FilterType } from './const.js';

//Функция возвращающая слово с заглавной буквы
const capitalizeLetter = (word) => word[0].toUpperCase() + word.slice(1);

//генреатор случайного числа
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//получение случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//выбор случайного id
const getArrayIds = (value) => {
  const arrayIds = [];

  for (let i = 0; i < value.length; i++) {
    arrayIds.push(value[i].id);
  }
  return arrayIds;
};

//получает случайный массив offer'ов
const getRandomArrayIdOffers = (currentArrayIdOffers) => {
  const resultOffers = [];
  const randomIndex = getRandomInteger(0, currentArrayIdOffers.length - 1);
  for (let i = 0; i < randomIndex; i++) {
    if (!resultOffers.includes(currentArrayIdOffers[i])) {
      resultOffers.push(currentArrayIdOffers[i]);
    }
  }
  return resultOffers;
};

//генерация уникального id
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//офрматирование даты
const humanizeTaskDueDate = (dueDate, dateFormat) => (dueDate && dateFormat ? dayjs(dueDate).format(dateFormat) : '');

const getDuration = (dateBegin, dateEnd) => {
  //вычисляем разницу в минутах
  const durationInMinutes = dayjs(dateEnd).diff(dateBegin, 'm');
  //вычисляем число дней
  const days = Math.floor(durationInMinutes / (TimeConverter.HOURS_IN_DAY * TimeConverter.MINUTES_IN_HOUR));
  //вычисляем часы
  const hours = Math.floor((durationInMinutes % (TimeConverter.HOURS_IN_DAY * TimeConverter.MINUTES_IN_HOUR)) / TimeConverter.MINUTES_IN_HOUR);
  //вычисляем минуты
  const minutes = durationInMinutes % TimeConverter.MINUTES_IN_HOUR;

  let durationResult = '';

  if (days > 0) {
    durationResult += `${days}D `;
  }

  if (hours > 0) {
    durationResult += `${hours}H `;
  }

  if (minutes > 0 || (days === 0 && hours === 0)) {
    durationResult += `${minutes}M `;
  }

  return durationResult;
};

//нажата ли кнопка Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

//является прошедшей датой
const isPastDate = (dueDate) => {
  const currentDate = dayjs();
  const targetDate = dayjs(dueDate);
  return targetDate.isBefore(currentDate);
};

//является текущей датой
const isPresentDate = (dueDate) => {
  const currentDate = dayjs();
  const targetDate = dayjs(dueDate);
  return targetDate.isSame(currentDate, 'day');
};

//является будующей датой
const isFutureDate = (dueDate) => {
  const currentDate = dayjs();
  const targetDate = dayjs(dueDate);
  return targetDate.isAfter(currentDate);
};

const filter = {
  [FilterType.EVERYTHING]: (eventPoints) => eventPoints,
  [FilterType.FUTURE]: (eventPoints) => eventPoints.filter((eventPoint) => isFutureDate(eventPoint.dateTo)),
  [FilterType.PRESENT]: (eventPoints) => eventPoints.filter((eventPoint) => isPresentDate(eventPoint.dateTo)),
  [FilterType.PAST]: (eventPoints) => eventPoints.filter((eventPoint) => isPastDate(eventPoint.dateTo)),
};

//заменяет пробелы на тире в offers для id формы редактирования
const replaceSpaceInName = (string) => {
  const relaceSymbol = /\s+/g;
  return string.replace(relaceSymbol, '-');
};

export {
  capitalizeLetter,
  getRandomInteger,
  getRandomArrayElement,
  getArrayIds,
  getRandomArrayIdOffers,
  createRandomIdFromRangeGenerator,
  humanizeTaskDueDate,
  getDuration,
  isEscapeKey,
  filter,
  replaceSpaceInName,
};
