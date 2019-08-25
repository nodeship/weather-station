import {WeatherStation} from './weather-station';
import { WeatherService } from './weather.service';

export function weatherStationFactory() {
  const weatherService = new WeatherService();
  const weatherStation = new WeatherStation(weatherService);
  return weatherStation;
}
