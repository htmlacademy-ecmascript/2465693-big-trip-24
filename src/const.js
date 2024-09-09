const FILTER_TYPES = ['everything', 'future', 'present', 'past'];
const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];
const NUMBER_LOCATION_POINTS = 5;

const TimeConverter = {
  HOURS_IN_DAY: 24,
  MINUTES_IN_HOUR: 60,
};

const DateFormat = {
  EVENT_DATE: 'MMM D',
  EVENT_TIME: 'HH:mm',
  EDIT_DATE: 'DD/MM/YY HH:mm',
};

export { FILTER_TYPES, SORT_TYPES, NUMBER_LOCATION_POINTS, DateFormat, TimeConverter };
