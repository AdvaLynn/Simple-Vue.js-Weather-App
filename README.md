# freshii-challenge

Project was created using vue.js using Vue CLI to create the basic implementation : vue create freshii-challenge.

This application is a simple view between two cities' weatther (default Toronto and Waterloo).
To change the cities there is a input box in the top left which allows you to search and replace the current city with any city in the world.

## Project setup
```
npm install
npm install axios
Must insert two API keys for project to run:
In freshii-challenge/public/index.html replace [GOOGLE-API-KEY] with a Google Maps Platform API
In freshii-challenge/src/main.js replace [Weather-API] with OpenWeatherMap API
```

### Run
```
npm run serve
```

Goals:
1. User should be able to see current weather in either Waterloo or Toronto.
This is achieved using the "Switch to X" button on the right of the page. It calls a Vue.js method switchCity() in main.js.

2. User should be able to change between the two locations, seeing only one at a time.
All data of a certain city is availiable one at a time, once the city is searched for, or the "Switch to X" button is pressed.

3. User should be able to refresh the weather data without reloading the page.
The weather api data is called every 5 minutes, using a timer in main.js.
