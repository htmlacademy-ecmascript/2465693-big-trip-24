import { NUMBER_LOCATION_POINTS } from '../const.js';
import { getRandomEventPoint } from '../mock/points.js';

export default class EventPointModel {
  eventPoint = Array.from({ length: NUMBER_LOCATION_POINTS }, getRandomEventPoint);

  getEventPoint() {
    return this.eventPoint;
  }
}
