const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon img');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const locationIcon = document.querySelector('.weather-icon');

// Set the default city input
let cityInput = "Coimbatore";

// Use environment variable for the API key
const apiKey = "{{ WEATHER_API_KEY }}"; // This will be replaced with your API key during deployment

// Add click event to each city in the panel
cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0";
  });
});

// Add submit event to the form
form.addEventListener('submit', (e) => {
  if (search.value.length == 0) {
    alert('Please type in a city name');
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
  }
  e.preventDefault();
});

// Function to get the day of the week
function dayOfTheWeek(day, month, year) {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekday[new Date(`${month}/${day}/${year}`).getDay()];
}

// Function to fetch weather data from the API
function fetchWeatherData() {
  fetch(`http://api.weatherapi.com/v1/current.json?key=${e26473e7e8cd468e8e365839242707}&q=${cityInput}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      // Update temperature and condition
      temp.innerHTML = data.current.temp_c + "°";
      conditionOutput.innerHTML = data.current.condition.text;

      // Get the date and time from the API
      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      // Update date and time on the page
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d} / ${m} / ${y}`;
      timeOutput.innerHTML = time;

      // Update city name
      nameOutput.innerHTML = data.location.name;

      // Update weather details
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + " km/h";

      // Update background and button styles based on the weather condition
      let timeOfDay = "day";
      const code = data.current.condition.code;
      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      if (code == 1000) {
        app.style.backgroundImage = `url("images/dayclear.jpg")`;
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          app.style.backgroundImage = `url("images/nytclear.jpg")`;
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1003 || code == 1006 || code == 1009 || code == 1030 ||
        code == 1069 || code == 1087 || code == 1135 || code == 1273 ||
        code == 1276 || code == 1279 || code == 1282
      ) {
        app.style.backgroundImage = `url("images/daycloudy.jpg")`;
        btn.style.background = "#fa6d1b";
        if (timeOfDay == "night") {
          app.style.backgroundImage = `url("images/nytcloudy.jpg")`;
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1063 || code == 1069 || code == 1072 || code == 1150 ||
        code == 1153 || code == 1180 || code == 1183 || code == 1186 ||
        code == 1189 || code == 1192 || code == 1195 || code == 1204 ||
        code == 1207 || code == 1240 || code == 1243 || code == 1246 ||
        code == 1249 || code == 1252
      ) {
        app.style.backgroundImage = `url("images/dayrain.jpg")`;
        btn.style.background = "#647d75";
        if (timeOfDay == "night") {
          app.style.backgroundImage= `url("images/nytrain.jpg")`;
          btn.style.background = "#325c80";
        }
      } else {
        app.style.backgroundImage = `url("images/daysnow.jpg")`;
        btn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          app.style.backgroundImage = `url("images/nytsnow.jpg")`;
          btn.style.background = "#1b1b1b";
        }
      }

      // Fade in the weather app
      app.style.opacity = "1";
    })
    .catch((error) => {
      alert(error.message);
      app.style.opacity = "1";
    });
}

// Initial fetch to display weather data
fetchWeatherData();
app.style.opacity = "1";
