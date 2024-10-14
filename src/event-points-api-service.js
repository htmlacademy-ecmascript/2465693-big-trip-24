import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class EventPointsApiService extends ApiService {
  get eventPoints() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse);
  }

  async updatePoint(eventPoint) {
    const response = await this._load({
      url: `points/${eventPoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(eventPoint)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(eventPoint) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(eventPoint)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(eventPoint) {
    const response = await this._load({
      url: `points/${eventPoint.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(eventPoint) {
    const adaptedEventPoint = {
      ...eventPoint,
      /* eslint-disable */
      date_from: eventPoint.dateFrom instanceof Date ? eventPoint.dateFrom.toISOString() : null,
      date_to: eventPoint.dateFrom instanceof Date ? eventPoint.dateTo.toISOString() : null,
      base_price: Number(eventPoint.basePrice),
      is_favorite: eventPoint.isFavorite,
      /* eslint-enable */
    };

    delete adaptedEventPoint.dateFrom;
    delete adaptedEventPoint.dateTo;
    delete adaptedEventPoint.basePrice;
    delete adaptedEventPoint.isFavorite;

    return adaptedEventPoint;
  }
}
