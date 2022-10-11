var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0665f0648c43bd8f0f67061eb3326c8a";
var geocodeApi = "https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=0665f0648c43bd8f0f67061eb3326c8a";
var currentApi = "https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid=0665f0648c43bd8f0f67061eb3326c8a";
var cities = []; 
//var lat = weatherResponse.coord.lat;
//var lon = weatherResponse.coord.lon;
//var iconApi = "https://openweathermap.org/img/wn/${icons}.png"
//var icons = weatherresponse.weather[0].icon
var today = moment().format('L');
console.log(today)

function displayCityWeather() {
    //var cityname = $(this).attr("data-city");
   

    $.ajax({
        url: currentApi,
        method: "GET"
    }).then(function(weatherResponse){
        console.log(weatherResponse)

        $("#weather-info").css("display", "block");
        $("#city-weather").empty();

        var iconApi = "https://openweathermap.org/img/wn/${icons}.png"
        var icons = weatherresponse.weather[0].icon

        var currentCity = $(`
            <h2 id="currentCity">
                ${weatherResponse.name} ${today} <img src="${iconApi}"/>
            </h2>
            <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
            <p>Humidity: ${cityWeatherResponse.main.humidity}\%</p>
            <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>
        `);

        $("city-weather").append(currentCity);

    })
}
function forecastedweather() {
    
    $.ajax({
        url: weatherApi,
        method: "GET"
    }).then(function(fiveDay){
        console.log(fiveDay);
        $("#forecast").empty

        for (var i=1; i<6; i++) {
            var weatherData = {
                date: fiveDay.daily[i].dt,
                icon: fiveDay.daily[i].weather[0].icon,
                temp: fiveDay.daily[i].temp.day,
                humidity: fiveDay.daily[i].humidity
            }
        }
    })
}

   // generated button below

function renderButtons() {
    $("#past-entry").empty();
    for (var i=0; i < cities.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("city-btn");
    newButton.attr("data-city", cities[i]);
    newButton.text(cities[i]);
    $("#past-entry").append(newButton);
    }
} 

$("#get-weather").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    cities.push(city);
    
    renderButtons();
});

$(document).on("click", ".city-btn", displayCityWeather);
renderButtons();