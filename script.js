var pastEntryEl = $('#past-entry');
var cityInputEl = $('#city');
var listEl = $('li');
var formEl = $('#user-form');

var printCity = function (city) {
    var listEl = $('li');
    listEl.addClass('list-group-item').text(city);
    listEl.appendto(pastEntryEl);
};

var weatherForm = function(event) {
    event.preventDefault();

var cityInput = cityInputEl.val();

    if (!cityInput) {
        console.log ('fill out criteria');
        return;
    }
    printCity(cityInput);

    cityInputEl.val("");
}

formEl.on("submit", weatherForm);