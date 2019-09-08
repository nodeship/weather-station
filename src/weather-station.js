import {getUserLocation} from './geolocation';

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

  async start() {
    const position = await getUserLocation()
    const weather = await this.weatherService.get(position.coords);
    if (weather) {
      this.toggleImages();
    }
    this.weather = weather;
    this.render();
  }

  toggleImages() {
    this.toggleHidden(this.weatherIcon);
    this.toggleHidden(this.spinner);
  }

  getElementRefs() {
    this.container = document.getElementById('currentWeather');
    this.toFBtn = document.getElementById('toF');
    this.toCBtn = document.getElementById('toC');
    this.title = document.getElementById('cardTitle');
    this.weatherDetails = document.getElementById('weatherDetails');
    this.weatherIcon = document.getElementById('weatherIcon');
    this.spinner = document.getElementById('spinner');
  }

  weatherDetailsTemplate(unit = tempUnits.Farhenheit) {
    let temp = this.getTemp(tempUnits.Farhenheit);
    if (unit === tempUnits.Celsius) {
      temp = this.getTemp(tempUnits.Celsius);
    }
    return `<p class="card-text">Current: ${temp.current}</p>
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
        current: String(this.toCelsius(this.weather.main.temp)).concat(" C"),
        max: String(this.toCelsius(this.weather.main.temp_max)).concat(" C"),
        min: String(this.toCelsius(this.weather.main.temp_min)).concat(" C")
      }
}
    return {
      current: String(this.weather.main.temp).concat(" F"),
      max: String(this.weather.main.temp_max).concat(" F"),
      min: String(this.weather.main.temp_min).concat(" F")
    }
  }

  toCelsius(temp) {
    return ((temp - 32)*5/9).toFixed(2);
  }

  toggleHidden(element) {
    element.classList.toggle('hidden');
  }
}
