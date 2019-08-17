import {getUserLocation} from './geolocation';
import {WeatherService} from './weather.service';

const $weatherService = new WeatherService();

export class WeatherStation {
  // Dependency Injection
  constructor(weatherService = $weatherService) {
    this.weatherService = weatherService;
  }
  start() {
    return getUserLocation()
    .then(position => this.weatherService.get(position.coords))
    .then(weather => console.log(weather));
  }
}