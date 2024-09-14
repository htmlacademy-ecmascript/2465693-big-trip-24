import { NUMBER_LOCATION_POINTS } from '../const.js';
import { getRandomEventPoint } from '../mock/points.js';
export default class EventPointsModel {
  /**воспользуемся инкапсуляцией и сделаем eventpoint приватным, чтобы нельзя было обратиться к нему снаружи
   * @type {Array{object}}
   */
  #eventPoints = Array.from({ length: NUMBER_LOCATION_POINTS }, getRandomEventPoint);

  get eventPoints() {
    return this.#eventPoints;
  }
}
