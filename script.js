const api = {
  key: 'b7b28bac88fb4c8b86cec6f1c41e63d6',
  url: 'https://api.openweathermap.org/data/2.5/',
};

const searchBar = document.querySelector('.search-bar');

searchBar.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResult(searchBar.value);
  }
}

function getResult(query) {
  fetch(`${api.url}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
}

function displayResult(weather) {
  console.log(weather);
  let city = document.querySelector('.content .city');
  city.innerText = `${weather.name},${weather.sys.country}`;
  let now = new Date();
  let date = document.querySelector('.date');
  date.innerText = getDate(now);
  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  let weatherEl = document.querySelector('.description');
  weatherEl.innerText = weather.weather[0].main;
  let minMax = document.querySelector('.min-max');
  minMax.innerHTML = `${Math.round(weather.main.temp_min)}°C/${Math.round(
    weather.main.temp_max
  )}°C`;
}

function getDate(d) {
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
