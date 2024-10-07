import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

//создаем класс PointsApiService в котором будет реализовано взаимодействие с сервером
export default class EventPointsApiService extends ApiService {
  //получаем от сервера все точки
  get eventPoints() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  async updatePoint(eventPoint) {
    const response = await this._load({
      url: `points/${eventPoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(eventPoint)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    //разбор ответа от сервера
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  //адаптируем данные для передачи на сервер camelCase TO snake_case
  #adaptToServer(eventPoint) {
    const adaptedEventPoint = {
      ...eventPoint,
      /* eslint-disable */
      date_from: eventPoint.dateFrom instanceof Date ? eventPoint.dateFrom.toISOString() : null, // На сервере дата хранится в ISO формате
      date_to: eventPoint.dateFrom instanceof Date ? eventPoint.dateTo.toISOString() : null,
      base_price: eventPoint.basePrice,
      is_favorite: eventPoint.isFavorite,
      /* eslint-enable */
    };

    //удаляем ненужные ключи из бъекта
    delete adaptedEventPoint.dateFrom;
    delete adaptedEventPoint.dateTo;
    delete adaptedEventPoint.basePrice;
    delete adaptedEventPoint.isFavorite;

    return adaptedEventPoint;
  }
}
