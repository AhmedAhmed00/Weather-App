let date = new Date();
let monthName = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Spet",
  "Oct",
  "Nov",
  "Dec",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let searchInput = document.querySelector(".search-input");

// get default data
getWether();

// get data after search
searchInput.addEventListener("keyup", search);

// fetch api
async function getWether(name = "London") {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b6fc9432d9c44de183434856230803&q=${name}&days=3 `
  );
  weatherData = await res.json();
  getTodayData(weatherData);
  getTheNextDay(weatherData);
}

// get Today data
function getTodayData(temp) {
  let today = document.querySelector(".item-today .the-day");
  let todayDate = document.querySelector(".item-today .the-date");
  let city = document.querySelector(".item-today .city");
  let temprtureDeg = document.querySelector(".item-today .temperature-deg");
  let temprtureStatus = document.querySelector(
    ".item-today .temperature-status"
  );
  let tempIcon = document.querySelector(".item-today .temperature-icon");
  let humadityDeg = document.querySelector(".item-today .humidity-deg");
  let windSpeedDeg = document.querySelector(".item-today .wind-speed-deg");
  let direction = document.querySelector(".item-today .direction-deg");
  today.innerHTML = days[date.getDay()];
  todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
  city.innerHTML = temp.location.name;
  temprtureDeg.innerHTML = `${temp.forecast.forecastday[0].day.maxtemp_c}<sup>o</sup>C `;
  temprtureStatus.innerHTML = temp.current.condition.text;
  tempIcon.setAttribute("src", `https:${temp.current.condition.icon}`);
  humadityDeg.innerHTML = `${temp.forecast.forecastday[0].day.avghumidity}%`;
  windSpeedDeg.innerHTML = `${temp.current.wind_kph}%`;
  direction.innerHTML = `${temp.current.wind_dir}`;
}

// get the next day data
function getTheNextDay(temp) {
  let theNext = document.querySelectorAll(".next-day");
  let today = document.querySelectorAll(".next-day .the-day");
  let maxDeg = document.querySelectorAll(".next-day .max-deg");
  let minDeg = document.querySelectorAll(".next-day .min-deg");
  let temprtureStatus = document.querySelectorAll(
    ".next-day .temperature-status"
  );
  let tempIcon = document.querySelectorAll(".next-day .temperature-icon");
  for (let i = 0; i < theNext.length; i++) {
    today[i].innerHTML = days[date.getDay() + i + 1];
    tempIcon[i].setAttribute(
      "src",
      `https:${temp.forecast.forecastday[i + 1].day.condition.icon}`
    );
    maxDeg[i].innerHTML = `${temp.forecast.forecastday[i + 1].day.maxtemp_c} `;
    minDeg[i].innerHTML = `${temp.forecast.forecastday[i + 1].day.mintemp_c} `;
    temprtureStatus[i].innerHTML =
      temp.forecast.forecastday[i].day.condition.text;
  }
}

// function to search by name of the city
function search() {
  getWether(searchInput.value);
  if (searchInput.value === "") {
    getWether();
  }
}
