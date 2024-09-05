//Функция возвращающая слово с заглавной буквы
const capitalizeLetter = (word) => word[0].toUpperCase() + word.slice(1);

//получение случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
export { capitalizeLetter, getRandomArrayElement };
