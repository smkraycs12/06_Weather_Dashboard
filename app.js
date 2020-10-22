// variables
let city = '';
let sCity = [];
let searchCity = $('#search-city');
let searchBtn = $('#search-btn');
let clearBtn = $('#clear-hist');
let currentCity = $('#current-city');
let currentTemp = $('#temp');
let currentWSpd = $('#wind-speed');
let currentUV  = $('#uv');
let currentHumidity = $('#humid')
let APIKey = '005e3cd129b095cce4f0ba04c44f87de'

// Check and see if the city is stored
function find(c) { 
    for (var i = 0; i < sCity.length; i++) {
        if (c.toUpperCase() === sCity[i]){
            return -1;
        }
    }
    return 1;
}

// Displays the current and future weather based on location entered into the search field
function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== '') {
        city = searchCity.val().trim();
        currentWeather(city);
    }
}

// Create the AJAX call 
function currentWeather(city) {
    // Creation of the url that will retreive the info
    let queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + APIKey;
    $.ajax({
        url : queryUrl,
        method : 'GET',
    }).then(function(response) {

    // console.log(response)

        //identify the current weather info and icon for display
        
        //retreiving weather icon from api 
        let weatherIcon = response.weather[0].icon;
        let iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

        //create date format 
        let date = new Date(response.dt * 1000).toLocaleDateString();

        //parse the response for the city and date and icon
        $(currentCity).html(response.name + '(' + date + ')' + '<img src=' + iconURL + '>');

        // identify the temp from the response and convert to fahrenheit
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        
        //display temp
        $(currentTemp).html((tempF).toFixed(2)+'&#8457');

        //display humidity
        $(currentHumidity).html(response.main.humidity + '%');

        //parse wind speed and convert to mph
        var ws = response.wind.speed;
        var windSpdMPH = (ws * 2.237).toFixed(1);

        // display wind speed in mph
        $(currentWSpd).html(windSpdMPH + 'MPH')

        // creating the url for uv using coordinates
        // identifing longitude and latitude
        UVIndex(response.coord.lon,response.coord.lat);

        forecast(response.id);
        if (response.cod == 200) {
            sCity = JSON.parse(localStorage.getItem('cityname'));
            if (sCity == null) {
                sCity = [];
                sCity.push(city.toUpperCase());
                localStorage.setItem('cityname',JSON.stringify(sCity));
                addToList(city);
            }
            else {
                if (find(city) > 0) {
                    sCity.push(city.toUpperCase());
                    localStorage.setItem('cityname',JSON.stringify(sCity));
                    addToList(city);
                }
            }
        }

    });
} 

// this function retreives the UVIndex 
function UVIndex(ln,lt) {
    // url for uv query
    let uvURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lt + '&lon=' + ln;
    $.ajax({
        url : uvURL,
        method : 'GET'
    }).then(function(response){
        //display uv
        $(currentUV).html(response.value);
    });
}

// display the 5 day forecast 
function forecast(cityid) {
    let dover = false;
    let queryForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?id=' + cityid + '&appid=' + APIKey;
    $.ajax({
        url : queryForecastURL,
        method : 'GET'
    }).then(function(response){
        // loop retreiving info for the 5 day forecast 
        for (i = 0; i < 5; i++) {
            let date5d = new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            let iconcode5d = response.list[((i+1)*8)-1].weather[0].icon;
            let iconURL5d =  'https://openweathermap.org/img/wn/' + iconcode5d + '.png';
            let tempK5d = response.list[((i+1)*8)-1].main.temp;
            let tempF5d = (((tempK5d-273.5) * 1.80) + 32).toFixed(2);
            let humidity5d = response.list[((i+1)*8)-1].main.humidity;

            // displays the 5 day info in each div
            $('#fDate' + i).html(date5d);
            $('#fImg' + i).html('<img src=' + iconURL5d + '>');
            $('#fTemp' + i).html(tempF5d + '&#8457');
            $('#fHumid' + i).html(humidity5d + '%');
        }
    });
}

//adds the passed cities to search history
function addToList(c){
    var listEl= $("<li>"+c.toUpperCase()+"</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value",c.toUpperCase());
    $(".list-group").append(listEl);
}

// display the past search again when the list group item is clicked in search history
function invokePastSearch(event){
    var liEl=event.target;
    if (event.target.matches("li")){
        city=liEl.textContent.trim();
        currentWeather(city);
    }

}

// render function
function loadlastCity(){
    $("ul").empty();
    var sCity = JSON.parse(localStorage.getItem("cityname"));
    if(sCity!==null){
        sCity=JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<sCity.length;i++){
            addToList(sCity[i]);
        }
        city=sCity[i-1];
        currentWeather(city);
    }

}

// search history clr 
function clrHist(event) { 
    event.preventDefault();
    sCity = [];
    localStorage.removeItem('cityname');
    document.location.reload();
}

// eventlisteners 
$('#search-btn').on('click',displayWeather);
$(document).on('click', invokePastSearch);
$(window).on('load', loadlastCity);
$('#clear-hist').on('click', clrHist);