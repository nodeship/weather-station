
import {xeta} from 'xeta';

const defaultApiKey = process.env.API_KEY;

export class WeatherService {
  constructor(apiKey = defaultApiKey) {
    this.apiKey = apiKey;
  }
  get(coords) {
      const api_key = this.apiKey;
      const base_url = `http://api.openweathermap.org/data/2.5/weather`;
      const url = `${base_url}?lat=${coords.latitude}&lon=${coords.longitude}&APPID=${api_key}`;
      return xeta.get(url);
  }
}