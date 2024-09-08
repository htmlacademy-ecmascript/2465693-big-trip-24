const FILTER_TYPES = ['everything', 'future', 'present', 'past'];
const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATION_LOCATIONS = ['Amsterdam', 'Geneva', 'Chamonix'];
const NUMBER_LOCATION_POINTS = 5;
const OFFER_TITLE = ['Order Uber', 'Add luggage', 'Switch to comfort', 'Rent a car', 'Add breakfast', 'Book tickets', 'Lunch in city'];
const OFFER_SELECTORS = [
  { id: 'luggage-1', checkbox: true, title: 'Add luggage', price: 30 },
  { id: 'comfort-1', checkbox: true, title: 'Switch to comfort', price: 100 },
  { id: 'meal-1', checkbox: false, title: 'Add meal', price: 15 },
  { id: 'seats-1', checkbox: false, title: 'Choose seats', price: 5 },
  { id: 'train-1', checkbox: false, title: 'Travel by train', price: 40 },
];
const TimeConverter = {
  HOURS_IN_DAY: 24,
  MINUTES_IN_HOUR: 60,
};

const DateFormat = {
  EVENT_DATE: 'MMM D',
  EVENT_TIME: 'HH:mm',
  EDIT_DATE: 'DD/MM/YY HH:mm',
};

export { FILTER_TYPES, SORT_TYPES, EVENT_TYPES, DESTINATION_LOCATIONS, NUMBER_LOCATION_POINTS, OFFER_TITLE, OFFER_SELECTORS, DateFormat, TimeConverter };
