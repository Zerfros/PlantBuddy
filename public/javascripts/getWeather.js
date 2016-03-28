var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        getWeather(xhttp);
    }
};
xhttp.open("GET", "http://api.openweathermap.org/data/2.5/forecast/daily?id=1609350&APPID=1680da4be53c79801962e75fc07ea278&mode=xml", true);
xhttp.send();

function getWeather(xml) {
    //TODAY
    //temparature
    var xmlDoc = xml.responseXML;
    var temperature = xmlDoc.getElementsByTagName('temperature')[0];
    var minTemperature = temperature.getAttribute("min");
    var maxTemperature = temperature.getAttribute("max");
    var avgTemperature = (parseInt(maxTemperature)+parseInt(minTemperature))/2
    document.getElementById("temperatureToday").innerHTML = Math.round(avgTemperature)-273;
    //weather
    var name = xmlDoc.getElementsByTagName('symbol')[0];
    var nameWeather = name.getAttribute("name");
    document.getElementById("weatherToday").innerHTML = nameWeather.capitalizeFirstLetter() + " | Today";
    //id
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

    //2ND
    //temparature
    var temperature2nd = xmlDoc.getElementsByTagName('temperature')[1];
    var minTemperature2nd = temperature2nd.getAttribute("min");
    var maxTemperature2nd = temperature2nd.getAttribute("max");
    var avgTemperature2nd = (parseInt(maxTemperature2nd)+parseInt(minTemperature2nd))/2
    document.getElementById("temperature2nd").innerHTML = Math.round(avgTemperature2nd)-273;
    //date
    var date2nd = xmlDoc.getElementsByTagName('time')[1];
    var dateWeather2nd = date2nd.getAttribute("day");
    document.getElementById("day2nd").innerHTML = dateWeather2nd.slice(5,10);
    //id
    var id2nd = xmlDoc.getElementsByTagName('symbol')[1];
    var idWeather2nd = id2nd.getAttribute("number");
    idWeather2nd = parseInt(idWeather2nd);
    if (idWeather2nd < 300 && idWeather2nd2nd >= 200) {
        document.getElementById("img-weather2nd").src = "images/weather/thunderstorm.png";
    } else if (idWeather2nd < 400 && idWeather2nd >= 300) {
        document.getElementById("img-weather2nd").src = "images/weather/drizzle.png";
    } else if (idWeather2nd < 600 && idWeather2nd >= 500) {
        document.getElementById("img-weather2nd").src = "images/weather/rain.png";
    } else if (idWeather2nd < 700 && idWeather2nd >= 600) {
        document.getElementById("img-weather2nd").src = "images/weather/snow.png";
    } else if (idWeather2nd < 800 && idWeather2nd >= 700) {
        document.getElementById("img-weather2nd").src = "images/weather/atmosphere.png";
    } else if (idWeather2nd = 800) {
        document.getElementById("img-weather2nd").src = "images/weather/cloud.png";
    } else if (idWeather2nd < 900 && idWeather2nd > 800) {
        document.getElementById("img-weather2nd").src = "images/weather/cloud.png";
    } else{
        document.getElementById("img-weather2nd").src = "images/weather/other.png";
    }

    //3RD
    //temparature
    var temperature3rd = xmlDoc.getElementsByTagName('temperature')[2];
    var minTemperature3rd = temperature3rd.getAttribute("min");
    var maxTemperature3rd = temperature3rd.getAttribute("max");
    var avgTemperature3rd = (parseInt(maxTemperature3rd)+parseInt(minTemperature3rd))/2
    document.getElementById("temperature3rd").innerHTML = Math.round(avgTemperature3rd)-273;
    //weather
    var date3rd = xmlDoc.getElementsByTagName('time')[2];
    var dateWeather3rd = date3rd.getAttribute("day");
    document.getElementById("day3rd").innerHTML = dateWeather3rd.slice(5,10);
    //id
    var id3rd = xmlDoc.getElementsByTagName('symbol')[2];
    var idWeather3rd = id3rd.getAttribute("number");
    idWeather3rd = parseInt(idWeather3rd);
    if (idWeather3rd < 300 && idWeather3rd >= 200) {
        document.getElementById("img-weather3rd").src = "images/weather/thunderstorm.png";
    } else if (idWeather3rd < 400 && idWeather3rd >= 300) {
        document.getElementById("img-weather3rd").src = "images/weather/drizzle.png";
    } else if (idWeather3rd < 600 && idWeather3rd >= 500) {
        document.getElementById("img-weather3rd").src = "images/weather/rain.png";
    } else if (idWeather3rd < 700 && idWeather3rd >= 600) {
        document.getElementById("img-weather3rd").src = "images/weather/snow.png";
    } else if (idWeather3rd < 800 && idWeather3rd >= 700) {
        document.getElementById("img-weather3rd").src = "images/weather/atmosphere.png";
    } else if (idWeather3rd = 800) {
        document.getElementById("img-weather3rd").src = "images/weather/clear.png";
    } else if (idWeather3rd < 900 && idWeather3rd > 800) {
        document.getElementById("img-weather3rd").src = "images/weather/cloud.png";
    } else{
        document.getElementById("img-weather3rd").src = "images/weather/other.png";
    }

    //4th
    //temparature
    var temperature4th = xmlDoc.getElementsByTagName('temperature')[3];
    var minTemperature4th = temperature4th.getAttribute("min");
    var maxTemperature4th = temperature4th.getAttribute("max");
    var avgTemperature4th = (parseInt(maxTemperature4th)+parseInt(minTemperature4th))/2
    document.getElementById("temperature4th").innerHTML = Math.round(avgTemperature4th)-273;
    //weather
    var date4th = xmlDoc.getElementsByTagName('time')[3];
    var dateWeather4th = date4th.getAttribute("day");
    document.getElementById("day4th").innerHTML = dateWeather4th.slice(5,10);
    //id
    var id4th = xmlDoc.getElementsByTagName('symbol')[3];
    var idWeather4th = id4th.getAttribute("number");
    idWeather4th = parseInt(idWeather4th);
    if (idWeather4th < 300 && idWeather4th >= 200) {
        document.getElementById("img-weather4th").src = "images/weather/thunderstorm.png";
    } else if (idWeather4th < 400 && idWeather4th >= 300) {
        document.getElementById("img-weather4th").src = "images/weather/drizzle.png";
    } else if (idWeather4th < 600 && idWeather4th >= 500) {
        document.getElementById("img-weather4th").src = "images/weather/rain.png";
    } else if (idWeather4th < 700 && idWeather4th >= 600) {
        document.getElementById("img-weather4th").src = "images/weather/snow.png";
    } else if (idWeather4th < 800 && idWeather4th >= 700) {
        document.getElementById("img-weather4th").src = "images/weather/atmosphere.png";
    } else if (idWeather4th = 800) {
        document.getElementById("img-weather4th").src = "images/weather/clear.png";
    } else if (idWeather4th < 900 && idWeather4th > 800) {
        document.getElementById("img-weather4th").src = "images/weather/cloud.png";
    } else{
        document.getElementById("img-weather4th").src = "images/weather/other.png";
    }

    //5TH
    //temparature
    var temperature5th = xmlDoc.getElementsByTagName('temperature')[4];
    var minTemperature5th = temperature5th.getAttribute("min");
    var maxTemperature5th = temperature5th.getAttribute("max");
    var avgTemperature5th = (parseInt(maxTemperature5th)+parseInt(minTemperature5th))/2
    document.getElementById("temperature5th").innerHTML = Math.round(avgTemperature5th)-273;
    //weather
    var date5th = xmlDoc.getElementsByTagName('time')[4];
    var dateWeather5th = date5th.getAttribute("day");
    document.getElementById("day5th").innerHTML = dateWeather5th.slice(5,10);
    //id
    var id5th = xmlDoc.getElementsByTagName('symbol')[4];
    var idWeather5th = id5th.getAttribute("number");
    idWeather5th = parseInt(idWeather5th);
    if (idWeather5th < 300 && idWeather5th >= 200) {
        document.getElementById("img-weather5th").src = "images/weather/thunderstorm.png";
    } else if (idWeather5th < 400 && idWeather5th >= 300) {
        document.getElementById("img-weather5th").src = "images/weather/drizzle.png";
    } else if (idWeather5th < 600 && idWeather5th >= 500) {
        document.getElementById("img-weather5th").src = "images/weather/rain.png";
    } else if (idWeather5th < 700 && idWeather5th >= 600) {
        document.getElementById("img-weather5th").src = "images/weather/snow.png";
    } else if (idWeather5th < 800 && idWeather5th >= 700) {
        document.getElementById("img-weather5th").src = "images/weather/atmosphere.png";
    } else if (idWeather5th = 800) {
        document.getElementById("img-weather5th").src = "images/weather/clear.png";
    } else if (idWeather5th < 900 && idWeather5th > 800) {
        document.getElementById("img-weather5th").src = "images/weather/cloud.png";
    } else{
        document.getElementById("img-weather5th").src = "images/weather/other.png";
    }
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}