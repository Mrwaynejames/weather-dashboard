var cities = []; 
var today = moment().format('L');
console.log(today)

function displayCityWeather() {
    var currentApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=0665f0648c43bd8f0f67061eb3326c8a";
    $.ajax({
        url: currentApi,
        method: "GET"
    }).then(function(weatherResponse){
        console.log(weatherResponse)

        $("#weather-info").css("display", "block");
        $("#city-weather").empty();

        var icons = weatherresponse.weather[0].icon
        var iconApi = "https://openweathermap.org/img/wn/${icons}.png"
       

        var currentCity = $(`
            <h2 id="currentCity">
                ${weatherResponse.name} ${today} <img src="${iconApi}"/>
            </h2>
            <p>Temperature: ${weatherResponse.main.temp} °F</p>
            <p>Humidity: ${weatherResponse.main.humidity}\%</p>
            <p>Wind Speed: ${weatherResponse.wind.speed} MPH</p>
        `);

        $("#city-weather").append(currentCity);
    })
}
function forecastedweather() { 
    var city = "chicago";
    var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=0665f0648c43bd8f0f67061eb3326c8a";
    $.ajax({
        url: weatherApi,
        method: "GET"
    }).then(function(fiveDay){
        console.log(fiveDay);
        $("#forecast").empty();

        for (var i=0; i<5; i++) {
            var weatherData = {
                date: fiveDay.daily[i].dt,
                icon: fiveDay.daily[i].weather[0].icon,
                temp: fiveDay.daily[i].temp.day,
                humidity: fiveDay.daily[i].humidity,
                windSpeed: fiveDay.daily[i].wind.speed,
            };
            var todayDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
            var weatherIcon = src="https://openweathermap.org/img/wn/${weatherData.icon}.png";

            var futureWeather = $(
                <div class="card-body">
                    <h5 id="forecast">${todayDate}</h5>
                    <p>${weatherIcon}</p>
                    <p> Temp: ${weatherData.temp}</p>
                    <p>Humidity: ${weatherData.humidity}\%</p>
                    <p>Wind Speed: ${weatherData.wind.speed}MPH</p>
                </div>
             );

        $("#forecast").append(futureWeather);       
        }
    });
}
forecastedweather();



// function renderButtons() {
//     $("#past-entry").empty();
//     for (var i=0; i < cities.length; i++) {
//     var newButton = $("<button>");
//     newButton.addClass("city-btn");
//     newButton.attr("data-city", cities[i]);
//     newButton.text(cities[i]);
//     $("#past-entry").append(newButton);
//     }
// } 

$("#get-weather").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    cities.push(city);
    var searchedCity = $(
    <li class="list-group">${city}</li>
    );
    $("#past-entry").append(searchedCity);


    localStorage.setItem("city", JSON.stringify(cities));
    
    renderButtons();
});
$( "city-btn" ).on( "submit", function( event ) {
    event.preventDefault();
    displayCityWeather();
  });
$("city-btn").on("submit", displayCityWeather);
renderButtons();

$(document).ready(function() {
    var histArr = JSON.parse(localStorage.getItem("city"));


});

displayCityWeather();    