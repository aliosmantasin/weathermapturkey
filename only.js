

    async function getWeather() {
        const apiKey = '61a564795058a577b554951bc1d46e08';
        const cityValue = document.getElementById('inputCity').value;
        if (!cityValue) {
            alert("Şehir İsmi Giriniz");
            return;
        }

        const loadingMessage = document.getElementById('loadingMessage');
        loadingMessage.style.display = 'block'; 
        
        //City Value 
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}`;

        try {
            const response = await fetch(currentWeatherUrl);
            const data = await response.json();
            console.log("cityValue",data)
            displayWeather(data);
            ForecastTitle(data.name);
            changeCityColor(cityValue); 
            ForecastTitle(data);
            
        } catch (error) {
            console.error('Mevcut hava durumu verileri alınırken hata oluştu', error);
        }


        //forcast 5 days
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${apiKey}`;
      
        try {
            const response = await fetch(forecastUrl);
            const data = await response.json();
            hourlyForecast(data.list, cityValue);
            console.log("5day",data)
           
        } catch (error) {
            console.error('Mevcut forecast hava durumu verileri alınırken hata oluştu', error);
        }

        loadingMessage.style.display = 'none'; // Yükleniyor mesajını gizle
        
    }



    //
    function displayWeather(data) {

        const cityName = data.name;
        const temperatureKelvin = data.main.temp;
        const temperatureKelvinMax = data.main.temp_max;
        const temperatureKelvinMin = data.main.temp_min;
        const temperatureCelsius = Math.round(temperatureKelvin - 273.15); 
        const temperatureCelsiusMax = Math.round(temperatureKelvinMax - 273.15);
        const temperatureCelsiusMin = Math.round(temperatureKelvinMin - 273.15);
    

  
        const weatherDescription = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        
        
        const weatherIcon = document.getElementById('weather-icon');
        const temperatureElement = document.getElementById("tempCity");
        tempCity.classList.add("cart");
        const weatherInfoElement = document.getElementById("weatherInfo");
        const weatherMaxInfoElement = document.getElementById("weatherMaxInfo");
        weatherMaxInfo.classList.add("cart");
        const weatherMinInfoElement = document.getElementById("weatherMinInfo");
        weatherMinInfo.classList.add("cart");
        const cityNameElement = document.getElementById("outputCity");
        weatherIcon.src = iconUrl;
        showImage();
    
        temperatureElement.innerHTML = `<p>Sıcaklık: ${temperatureCelsius} °C</p>`;
        weatherMaxInfoElement.innerHTML = `<p><i class="fa-solid fa-arrow-up"></i> ${temperatureCelsiusMax} °C</p>`;
        weatherMinInfoElement.innerHTML = `<p><i class="fa-solid fa-arrow-down"></i> ${temperatureCelsiusMin} °C</p>`;
        weatherInfoElement.innerHTML = `<p>Weather Forecast: ${weatherDescription}</p>`;
        cityNameElement.innerHTML = `<p>${cityName}</p>`;
    }
    
    const cityArea = document.querySelectorAll('.cls-1');
    
    cityArea.forEach(city => {
        city.addEventListener('click', () => {
            let cityName = city.getAttribute('data-name');
            document.getElementById('inputCity').value = cityName;
           
            cityArea.forEach(city => {
                city.classList.remove('selected-city');
            });
    
            city.classList.add('selected-city');
            getWeather();
           
        });
    });
    
    //
    function changeCityColor(cityName) {
        const cityAreas = document.querySelectorAll('.cls-1');
        cityAreas.forEach(city => {
            const cityNameAttr = city.getAttribute('data-name');
            if (cityNameAttr === cityName) {
                city.classList.add('selected-city');
            } else {
                city.classList.remove('selected-city');
            }
        });
    }
    
    //
    function showImage() {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block'; 
    }


    function ForecastTitle(data) { 
        const forecastTitle = document.getElementById('forecastFiveDays');
        forecastTitle.innerHTML = `Mevcut 5 Günlük Hava Durumu - ${data.name}`;
    }
    
  
    function hourlyForecast(data) {
        const sliderContent = document.getElementById('forecastSlider');
        sliderContent.innerHTML = ''; // Mevcut içeriği temizle
        
        const sliderItems = data.map(item => {
            const dateTime = new Date(item.dt * 1000); 
            const hour = dateTime.getHours();
            const day = dateTime.getDay();
            const daysOfWeek = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            const dayName = daysOfWeek[day];
            const temperature = Math.round(item.main.temp - 273.15);
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
            
            return `
            <div class="slider-item">
                <div class="hour">${hour}:00</div>
                <div class="hour">${dayName}</div>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <div class="temperature">${temperature}°C</div>
            </div>`;
        }).join(""); // 
        
        sliderContent.innerHTML = sliderItems; // İçeriği bir seferde ekle
    }
    



