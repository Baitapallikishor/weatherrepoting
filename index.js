

const apiKey = "50ded2cf60d65a528966003f3aeb5f08";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon"); 

async function checkWeather(city) {
    if (!city) {
        console.error("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const timezoneOffset = data.timezone;
        updateDateTime(timezoneOffset);

        // Update Weather Icon
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "cloud.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "mist.png";
        } else {
            weatherIcon.src = "default.png"; 
        }
    } catch (error) {
        console.error(error);
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "--°C";
        document.querySelector(".humidity").innerHTML = "--%";
        document.querySelector(".wind").innerHTML = "-- km/h";
        weatherIcon.src = "default.png";
    }
}


function updateDateTime(offset) {
            const now = new Date();
            const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
            const localTime = new Date(utcTime + offset * 1000);
    
            const options = { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true 
            };
    
            document.querySelector(".datetime").innerHTML = localTime.toLocaleString("en-US", options);
        }
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});
    
/*
     <script>
        const apikey="50ded2cf60d65a528966003f3aeb5f08";
        const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        
         const searchBox=document.querySelector(".search input")
         const searchBtn=document.querySelector(".search button")

        
         async function checkweather(city) {
            const response = await fetch( apiUrl + city + `&appid=${apikey}`);
             var data = await  response.json();
              console.log(data);
              document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
             
              //default images come 

        
         }  
     searchBtn.addEventListener("click", () =>
     {
        checkweather(searchBox.value);
     })
    
        checkweather();

    </script>   
*/
