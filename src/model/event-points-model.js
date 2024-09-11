import { NUMBER_LOCATION_POINTS } from '../const.js';
import { getRandomEventPoint } from '../mock/points.js';
export default class EventPointModel {
  /**воспользуемся инкапсуляцией и сделаем eventpoint приватным, чтобы нельзя было обратиться к нему снаружи */
  #eventPoint = Array.from({ length: NUMBER_LOCATION_POINTS }, getRandomEventPoint);

  get eventPoint() {
    return this.#eventPoint;
  }
}
