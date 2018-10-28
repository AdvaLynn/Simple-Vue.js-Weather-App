new Vue({
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
    alt: "Toronto",
    city_country: "",
    alt_country: "",
    new_city: null,
    new_country: null

  },
  methods: {
    getWeather() {
      //let url = "http://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&APPID=be979721f16e8857ea19be1e4316b84b";
      axios
        .get("http://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: (this.new_city) ? this.new_city + this.new_country : this.city + this.city_country,
            units: "metric",
            APPID: [WEATHER-API]
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
          if (weatherApp.new_city) {
            window.weatherApp.switchCity();
          };
      })
      .catch(error => {
        alert("Sorry could not find " + this.new_city)
        this.new_city = null;
        this.new_country = null;

        console.log(error);
      });
    },
    switchCity() {
      if (this.new_city) {
        this.alt = this.city;
        this.alt_country = this.city_country;
        this.city = this.new_city;
        this.city_country = this.new_country;
        this.new_city = null;
        this.new_country = null;
      }
      else {
        var temp = this.city;
        this.city = this.alt;
        this.alt = temp;
        temp = this.city_country;
        this.city_country = this.alt_country;
        this.alt_country = temp;
      }
      if (this.city == "Toronto") {
        document.body.style.backgroundImage = "url('../toronto.jpg')";
      }
      else if (this.city == "Waterloo") {
        document.body.style.backgroundImage = "url('../waterloo.jpg')";
      }
      else {
        document.body.style.backgroundImage = "url('../city.jpg')";
      }
    }
  },
  beforeMount() {
    this.getWeather();
    this.timer = setInterval(this.getWeather(), 30000)
    window.weatherApp = this;
  },
  beforeUpdate() {
    this.getWeather();
  }
});
