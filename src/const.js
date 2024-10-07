const NUMBER_LOCATION_POINTS = 3;

const TimeConverter = {
  HOURS_IN_DAY: 24,
  MINUTES_IN_HOUR: 60,
};

const DateFormat = {
  EVENT_DATE: 'MMM D',
  EVENT_TIME: 'HH:mm',
  EDIT_DATE: 'DD/MM/YY HH:mm',
};

const MessageText = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const availableSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFERS]: false,
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const START_TYPE = 'flight';

const NEW_POINT = {
  id: 0,
  basePrice: '0',
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: START_TYPE,
};

export { SortType, availableSortType, NUMBER_LOCATION_POINTS, DateFormat, TimeConverter, MessageText, FilterType, UpdateType, UserAction, NEW_POINT, START_TYPE };
