var weatherApp = new Vue({
  el: '#app',
  data: {
    currentTemp: '',
    minTemp: '',
    maxTemp:'',
    sunrise: '',
    sunset: '',
    pressure: '',
    humidity: '',
    wind: '',
    overcast: '',
    city: 'Waterloo',
    alt: "Toronto"

  },
  methods: {
    switchCity() {
      var temp = this.city;
      this.city = this.alt;
      this.alt = temp;
      if (this.city == "Toronto") {
        document.body.style.backgroundImage = "url('../toronto.jpg')";
      }
      else if (this.city == "Waterloo") {
        document.body.style.backgroundImage = "url('../waterloo.jpg')";
      }
      else {
        document.body.style.backgroundImage = "url('../city.jpg')";
      }
    },
    getWeather() {
      //let url = "http://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&APPID=be979721f16e8857ea19be1e4316b84b";
      axios
        .get("http://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: this.city,
            units: "metric",
            APPID: [Weather-API]
          }
        })
        .then(response => {
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + '%';
          this.wind = response.data.wind.speed + 'm/s';
          this.overcast = response.data.weather[0].description;
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB");
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB");
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
  beforeMount() {
    this.getWeather();
    window.weatherApp = this;
  },
  beforeUpdate() {
    this.getWeather();
  },
  showAddCity() {
    document.getElementById("pac-input").style.display = "block";
  },
});
