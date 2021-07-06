let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[now.getMonth()];

let timestamp = document.querySelector(".timestamp");
timestamp.innerHTML = `${currentDay}, ${now.getDate()} ${currentMonth} ${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}`;

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "8b6175f95e7e0d85f2cdc076f2d44d9d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector(".currentDegrees");
  let cityElement = document.querySelector("#city");
  let windspeed = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humid");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document
    .querySelector("#weatherIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  descriptionElement.innerHTML = response.data.weather[0].description;

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "8b6175f95e7e0d85f2cdc076f2d44d9d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function retrievePosition(position) {
  let apiKey = "8b6175f95e7e0d85f2cdc076f2d44d9d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector(".currentButton");
currentButton.addEventListener("click", getPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  temperatureElement = document.querySelector(".currentDegrees");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  temperatureElement = document.querySelector(".currentDegrees");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", displayCelciusTemperature);

search("The Hague");
