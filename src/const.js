const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];
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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export { SORT_TYPES, NUMBER_LOCATION_POINTS, DateFormat, TimeConverter, MessageText, FilterType };
