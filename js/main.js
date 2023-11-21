let response;
let finalresp;
let Months = ["January", "Feburary", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Today
let searchBar = document.getElementById("searchBar");
let searchBtn = document.getElementById("searchBtn");
let rowData = document.getElementById("rowData");
let today = document.getElementById("today");
let dateMonth = document.getElementById("dateMonth");
let zone = document.getElementById("zone");
let currentTemp = document.getElementById("currentTemp");
let weatherImg = document.getElementById("weatherImg");
let windDegree = document.getElementById("windDegree");
let windKph = document.getElementById("windKph");
let windDir = document.getElementById("windDir");
// Next Day
let nextDay = document.getElementById("nextDay");
let nextWeatherIcon = document.getElementById("nextWeatherIcon");
let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");
let nextCondition = document.getElementById("nextCondition");
// After Next Day
let nextDay2 = document.getElementById("nextDay2");
let nextWeatherIcon2 = document.getElementById("nextWeatherIcon2");
let maxTemp2 = document.getElementById("maxTemp2");
let minTemp2 = document.getElementById("minTemp2");
let nextCondition2 = document.getElementById("nextCondition2");

async function getWeather(currentCity = 'cairo') {
    response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`);
    finalresp = await response.json();
    console.log(finalresp.forecast.forecastday);
    displayTodayWeather();
    displayNextDayWeather();
}

getWeather()

function displayTodayWeather() {
    let date = new Date()
    today.innerHTML = days[date.getDay()];
    dateMonth.innerHTML = `${date.getDate()} ${Months[date.getMonth()]}`;
    zone.innerHTML = finalresp.location.name;
    currentTemp.innerHTML = `${finalresp.current.temp_c} <sup>o</sup>C`;
    weatherImg.setAttribute('src', `https://${finalresp.current.condition.icon}`);
    condition.innerHTML = finalresp.current.condition.text;
    windDegree.innerHTML = `<i class="fa-solid fa-umbrella fs-5"></i> ${finalresp.current.wind_degree}%`
    windKph.innerHTML = `<i class="fa-solid fa-wind fs-5"></i> ${finalresp.current.wind_kph}`
    windDir.innerHTML = `<i class="fa-regular fa-compass fs-5"></i> ${finalresp.current.wind_dir}`
}
function displayNextDayWeather() {
    for (let i = 0; i < finalresp.forecast.forecastday.length; i++) {
        nextDay.innerHTML = days[new Date(finalresp.forecast.forecastday[i].date).getDay()];
        nextWeatherIcon.setAttribute('src', `https://${finalresp.forecast.forecastday[i].day.condition.icon}`);
        maxTemp.innerHTML = `${finalresp.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C`;
        minTemp.innerHTML = `${finalresp.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C`;
        nextCondition.innerHTML = finalresp.forecast.forecastday[i].day.condition.text;

        nextDay2.innerHTML = days[new Date(finalresp.forecast.forecastday[i + 2].date).getDay()];
        nextWeatherIcon2.setAttribute('src', `https://${finalresp.forecast.forecastday[i + 2].day.condition.icon}`);
        maxTemp2.innerHTML = `${finalresp.forecast.forecastday[i + 2].day.maxtemp_c}<sup>o</sup>C`;
        minTemp2.innerHTML = `${finalresp.forecast.forecastday[i + 2].day.mintemp_c}<sup>o</sup>C`;
        nextCondition2.innerHTML = finalresp.forecast.forecastday[i + 2].day.condition.text;
    }
}


searchBtn.addEventListener('click', function () {
    currentCity = searchBar.value;
    console.log(currentCity);
    getWeather(currentCity);
})