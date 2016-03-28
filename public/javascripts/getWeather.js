var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        getWeather(xhttp);
    }
};
xhttp.open("GET", "http://api.openweathermap.org/data/2.5/forecast/daily?id=1609350&APPID=1680da4be53c79801962e75fc07ea278&mode=xml", true);
xhttp.send();

function getWeather(xml) {
    //temparatureToday
    var xmlDoc = xml.responseXML;
    var temperature = xmlDoc.getElementsByTagName('temperature')[0];
    var minTemperature = temperature.getAttribute("min");
    var maxTemperature = temperature.getAttribute("max");
    var avgTemperature = (parseInt(maxTemperature)+parseInt(minTemperature))/2
    document.getElementById("temperatureToday").innerHTML = Math.round(avgTemperature)-273;

    //weatherToday
    var name = xmlDoc.getElementsByTagName('symbol')[0];
    var nameWeather = name.getAttribute("name");
    document.getElementById("weatherToday").innerHTML = nameWeather.capitalizeFirstLetter();

    //idToday
    var id = xmlDoc.getElementsByTagName('symbol')[0];
    var idWeather = id.getAttribute("number");
    idWeather = parseInt(idWeather);
    if (idWeather < 300 && idWeather >= 200) {
        document.getElementById("img-weather").src = "images/weather/thunderstorm.png";
    } else if (idWeather < 400 && idWeather >= 300) {
        document.getElementById("img-weather").src = "images/weather/drizzle.png";
    } else if (idWeather < 600 && idWeather >= 500) {
        document.getElementById("img-weather").src = "images/weather/rain.png";
    } else if (idWeather < 700 && idWeather >= 600) {
        document.getElementById("img-weather").src = "images/weather/snow.png";
    } else if (idWeather < 800 && idWeather >= 700) {
        document.getElementById("img-weather").src = "images/weather/atmosphere.png";
    } else if (idWeather = 800) {
        document.getElementById("img-weather").src = "images/weather/clear.png";
    } else if (idWeather < 900 && idWeather > 800) {
        document.getElementById("img-weather").src = "images/weather/cloud.png";
    } else{
        document.getElementById("img-weather").src = "images/weather/other.png";
    }

    //temparatureNextday
    var xmlDoc = xml.responseXML;
    var temperature = xmlDoc.getElementsByTagName('temperature')[1];
    var minTemperature = temperature.getAttribute("min");
    var maxTemperature = temperature.getAttribute("max");
    var avgTemperature = (parseInt(maxTemperature)+parseInt(minTemperature))/2
    document.getElementById("temperatureToday").innerHTML = Math.round(avgTemperature)-273;

    //weatherNextday
    var name = xmlDoc.getElementsByTagName('symbol')[1];
    var nameWeather = name.getAttribute("name");
    document.getElementById("weatherToday").innerHTML = nameWeather.capitalizeFirstLetter();

    //idNextday
    var id = xmlDoc.getElementsByTagName('symbol')[1];
    var idWeather = id.getAttribute("number");
    idWeather = parseInt(idWeather);
    if (idWeather < 300 && idWeather >= 200) {
        document.getElementById("img-weather").src = "images/weather/thunderstorm.png";
    } else if (idWeather < 400 && idWeather >= 300) {
        document.getElementById("img-weather").src = "images/weather/drizzle.png";
    } else if (idWeather < 600 && idWeather >= 500) {
        document.getElementById("img-weather").src = "images/weather/rain.png";
    } else if (idWeather < 700 && idWeather >= 600) {
        document.getElementById("img-weather").src = "images/weather/snow.png";
    } else if (idWeather < 800 && idWeather >= 700) {
        document.getElementById("img-weather").src = "images/weather/atmosphere.png";
    } else if (idWeather = 800) {
        document.getElementById("img-weather").src = "images/weather/clear.png";
    } else if (idWeather < 900 && idWeather > 800) {
        document.getElementById("img-weather").src = "images/weather/cloud.png";
    } else{
        document.getElementById("img-weather").src = "images/weather/other.png";
    }
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}