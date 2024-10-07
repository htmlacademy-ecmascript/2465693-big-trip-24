import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

//создаем класс PointsApiService в котором будет реализовано взаимодействие с сервером
export default class PointsApiService extends ApiService {
  //получаем от сервера все точки
  get points() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    //разбор ответа от сервера
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
