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

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = "8b6175f95e7e0d85f2cdc076f2d44d9d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemp(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  let celciusTemperature = response.data.main.temp;
  document.querySelector(".currentDegrees").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector("#humid").innerHTML =
    response.data.main.humidity + "% humidity";
  document.querySelector("#wind").innerHTML =
    response.data.wind.speed + " wind speed";
  document
    .querySelector("#weatherIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}
function showWeather(response) {
  let temperatureElement = document.querySelector(".currentDegrees");
  let temperature = Math.round(celciusTemperature);
  temperatureElement.innerHTML = `${temperature}`;

  let city = document.querySelector("#city");
  city.innerhtml = response.data.name;
  document.querySelector("#humid").innerHTML =
    response.data.main.humidity + "% humidity";
  document.querySelector("#wind").innerHTML =
    response.data.wind.speed + " wind speed";
  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function retrievePosition(position) {
  let apiKey = "8b6175f95e7e0d85f2cdc076f2d44d9d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector(".currentButton");
currentButton.addEventListener("click", getPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentDegrees");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".currentDegrees");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", displayCelciusTemperature);

let celciusTemperature = null;
