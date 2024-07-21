function fetchWeather() {
    var cityName = document.getElementById('search-bar').value;
    if(cityName === '') {
        alert('Please enter a city name');
        return;
    }
    var apiKey = "828cc99e0335c9476a8f751b7c386d9a";
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var temp = data.main.temp + '°C';
            var desc = data.weather[0].description;
            var humidity = 'Humidity: ' + data.main.humidity + '%';
            var wind = 'Wind Speed: ' + data.wind.speed + ' m/s';
            var pressure = 'Pressure: ' + data.main.pressure + ' hPa';
            var minMax = 'Min: ' + data.main.temp_min + '°C / Max: ' + data.main.temp_max + '°C';
            var city = data.name + ', ' + data.sys.country;
            var date = new Date().toLocaleDateString();

            document.getElementById('temp').innerHTML = temp;
            document.getElementById('desc').innerHTML = desc;
            document.getElementById('humidity').innerHTML = humidity;
            document.getElementById('wind').innerHTML = wind;
            document.getElementById('pressure').innerHTML = pressure;
            document.getElementById('min-max').innerHTML = minMax;
            document.getElementById('city').innerHTML = city;
            document.getElementById('date').innerHTML = date;

            document.getElementById('weather-box').style.display = 'block';
        })
        .catch(error => {
            console.log(error);
        });
}
