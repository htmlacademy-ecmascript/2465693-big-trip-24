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

export { capitalizeLetter, getRandomInteger, getRandomArrayElement, getArrayIds, getRandomArrayIdOffers, createRandomIdFromRangeGenerator };
