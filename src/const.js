const FILTER_TYPES = ['everything', 'future', 'present', 'past'];
const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATION_LOCATIONS = ['Amsterdam', 'Geneva', 'Chamonix'];
const NUMBER_LOCATION_POINTS = 3;
const OFFER_SELECTORS = [
  { id: 'luggage-1', checkbox: true, title: 'Add luggage', price: 30 },
  { id: 'comfort-1', checkbox: true, title: 'Switch to comfort', price: 100 },
  { id: 'meal-1', checkbox: false, title: 'Add meal', price: 15 },
  { id: 'seats-1', checkbox: false, title: 'Choose seats', price: 5 },
  { id: 'train-1', checkbox: false, title: 'Travel by train', price: 40 },
];

export { FILTER_TYPES, SORT_TYPES, EVENT_TYPES, DESTINATION_LOCATIONS, NUMBER_LOCATION_POINTS, OFFER_SELECTORS };
