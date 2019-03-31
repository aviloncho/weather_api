const weather_url = "http://api.openweathermap.org/data/2.5/weather"
const api_key = "3a6704c5cb6a49629052d93ed7932a36"
const id_search = "id"
const name_search = "q"

var cityInput = document.getElementById("city")

function setLabel(text) {
    cityInput.placeholder = "Enter " + text
    cityInput.value = ""
}

function getWeather() {
    var search_by = name_search
    var request = new XMLHttpRequest()
    
    console.log(`${weather_url}?${search_by}=${cityInput.value}&appid=${api_key}`)
    request.open('GET', `${weather_url}?${search_by}=${cityInput.value}&appid=${api_key}`, true)
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status < 400) {
            var data = JSON.parse(this.responseText)
            console.log(data)
        }
    }
    request.send()
    /*
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
    window.myWidgetParam.push({id: 15,cityid: '3688689',appid: '3a6704c5cb6a49629052d93ed7932a36',units: 'metric',containerid: 'openweathermap-widget-15',  });
    (function() {
        var script = document.createElement('script');
        script.async = true;
        script.charset = "utf-8";
        script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(script, s);
    })();
    */
}

document.getElementById("city_name").click()