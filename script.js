var weatherApi = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0665f0648c43bd8f0f67061eb3326c8a";
var geocodeApi = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},ISO 3166-2:US&limit=1&appid=684fb99c1378d181ad0cdef05eb04ec0";


var cities = []; 
function displayCityWeather() {
    var weather = $(this).attr("data-city");
    var queryURL = //open weather API + city + end of URL

    $.ajax({
        url:weatherApi,
        method: "GET"
    }).then(function(response){
        console.log(response)
        $("#city-weather").empty();

        var weatherDiv = $("<div>")
        weatherDiv.attr("class", 'movie');

        console.log(response);
        $("city-weather").prepend(weatherDiv);
    })

    renderButtons()
}
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