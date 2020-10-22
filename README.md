# 06 Server-Side APIs: Weather Dashboard

To use this app you type a city name into the search bar and press the search button. Once the first search is completed the app displays the current weather info aswell as the forecast for the next 5 day. Previous citys are listed below the search box and can be clicked on to pull their info up. This app uses the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities and uses `localStorage` to store any persistent data.

## Links to the active app and it repo on github




## Dashboard Photo 

![screen shot](./images/weather-dash.png)

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

## Resources

https://getbootstrap.com/

https://fontawesome.com/icons?d=gallery

https://www.w3schools.com/

https://openweathermap.org/api

"Javascript & Jquery" by Jon Duckett