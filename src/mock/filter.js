import { filter } from '../utils.js';

function generateFilter(eventPoints) {
  return Object.entries(filter).map(([filterType, filterEventPoint]) => ({
    type: filterType,
    count: filterEventPoint(eventPoints).length,
  }));
}

export { generateFilter };
