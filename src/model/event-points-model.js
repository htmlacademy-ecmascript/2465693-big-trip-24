import Observable from '../framework/observable.js';
import { NUMBER_LOCATION_POINTS } from '../const.js';
import { getRandomEventPoint } from '../mock/points.js';
export default class EventPointsModel extends Observable {
  #eventPoints = Array.from({ length: NUMBER_LOCATION_POINTS }, getRandomEventPoint);

  get eventPoints() {
    return this.#eventPoints;
  }
}
