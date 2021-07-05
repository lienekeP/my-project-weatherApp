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
