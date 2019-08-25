import {getUserLocation} from './geolocation';
import {WeatherService} from './weather.service';


export const tempUnits = {
  Celsius: 'CELSIUS',
  Farhenheit: 'FARENHEIT'
}

export class WeatherStation {
  // Dependency Injection
  constructor(weatherService) {
    this.weatherService = weatherService;
    this.getElementRefs();
    this.toFBtn.addEventListener('click', () => this.render(tempUnits.Farhenheit));
    this.toCBtn.addEventListener('click', () => this.render(tempUnits.Celsius));
  }

  start() {
    return getUserLocation()
    .then(position => this.weatherService.get(position.coords))
    .then(weather => {
      this.weather = weather;
      this.render()
    });
  }

  getElementRefs() {
    this.container = document.getElementById('currentWeather');
    this.toFBtn = document.getElementById('toF');
    this.toCBtn = document.getElementById('toC');
    this.title = document.getElementById('cardTitle');
    this.weatherDetails = document.getElementById('weatherDetails');
    this.weatherIcon = document.getElementById('weatherIcon');
  }

  weatherDetailsTemplate(unit = tempUnits.Farhenheit) {
    let temp = this.getTemp(tempUnits.Farhenheit);
    if (unit === tempUnits.Celsius) {
      temp = this.getTemp(tempUnits.Celsius);
    }
    return `<p class="card-text">Current: ${temp.current} F</p>
            <p class="card-text">Humidity: ${this.weather.main.humidity}</p>
            <p class="card-text">Pressure: ${this.weather.main.pressure}</p>
            <p class="card-text">Max Temp: ${temp.max}</p>
            <p class="card-text">Min Temp: ${temp.min}</p>`    
  }

  render(unit = tempUnits.Farhenheit) {
    const weatherDetails = this.weatherDetailsTemplate(unit);
    this.weatherDetails.innerHTML = weatherDetails;
    this.weatherIcon.src = `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`;
  }

  getTemp(unit) {
    if (unit === tempUnits.Celsius) {
      return {
        current: this.toCelsius(this.weather.main.temp),
        max: this.toCelsius(this.weather.main.temp_max),
        min: this.toCelsius(this.weather.main.temp_min)
      }
    }
    return {
      current: this.weather.main.temp,
      max: this.weather.main.temp_max,
      min: this.weather.main.temp_min
    }
  }

  toCelsius(temp) {
    return (temp - 32)*5/9;
  }
}
