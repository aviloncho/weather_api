const API_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = "3a6704c5cb6a49629052d93ed7932a36"
const ID_SEARCH = "id"
const NAME_SEARCH = "q"

var mainContainer = document.getElementById("main_container")
var cityId = document.getElementById("city_id")
var cityName = document.getElementById("city_name")
var cityInput = document.getElementById("city")
var apiError = document.getElementById("api_error")
var spinner = document.getElementById("spinner")

function setLabel(text) {
    cityInput.placeholder = "Enter " + text
    cityInput.value = ""
}

function getWeather() {
    var search_by

    apiError.style.display = "none"

    if (cityInput.value != "") {
        spinner.style.display = "inline-block"

        if (cityId.checked) {
            search_by = ID_SEARCH
        } else {
            search_by = NAME_SEARCH
        }
        var request = new XMLHttpRequest()
        var url_request = `${API_URL}?${search_by}=${cityInput.value}&appid=${API_KEY}`
        
        request.open('GET', url_request, true)
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status < 400) {
                    var data = JSON.parse(this.responseText)
                    var weatherWidget = document.getElementById("openweathermap-widget-15")
                    //console.log(data)
                    mainContainer.removeChild(weatherWidget)

                    var div_widget = document.createElement('div')
                    div_widget.id = "openweathermap-widget-15"
                    mainContainer.appendChild(div_widget)
                    
                    window.myWidgetParam = [];
                    window.myWidgetParam.push({id: 15,cityid: data.id,appid: API_KEY,units: 'metric',containerid: 'openweathermap-widget-15',  });
                    (function() {
                        var script = document.createElement('script');
                        script.async = false;
                        script.charset = "utf-8";
                        script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
                        var s = document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(script, s);
                    })();
                
                } else {
                    apiError.innerHTML = `Error ${this.status} - ${this.statusText}`
                    apiError.style.display = "block"
                }
                spinner.style.display = "none"
            }
        }
        request.send()
    }
    else {
        apiError.innerHTML = `Please Select City`
        apiError.style.display = "block"
    }
}

cityName.click()
