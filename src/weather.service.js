
import {sendRequest} from './xhr';

const defaultApiKey = process.env.API_KEY;

export class WeatherService {
  constructor(apiKey = defaultApiKey) {
    this.apiKey = apiKey;
  }
  get(coords) {
      const method = 'GET';
      const api_key = '60a2492123df6b408ef863bf6e05dd3b';
      const base_url = `http://api.openweathermap.org/data/2.5/weather`;
      const url = `${base_url}?lat=${coords.latitude}&lon=${coords.longitude}&APPID=${api_key}`;
      return sendRequest(method, url);
  }
}