const apiKey = `e0e7c4f779b31fa656828dce3d2eb921`;
//const city = "Bangalore";

async function fetchWeatherData(city){
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if(!response.ok){
            throw new Error("Unable to fetch Weather Report");
        }

        const data = await response.json();
        //console.log(data);
        updateWeatherUI(data);

        }
    catch(error){
            console.error(error);
        }

}

const cityElement = document.querySelector(".city");
const temperatureElement = document.querySelector(".temp");
const windElement = document.querySelector(".wind-speed");
const humidityElement = document.querySelector(".humidity");
const visibilityElement = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const descriptionIcon = document.querySelector(".description i")

function updateWeatherUI(data){
    cityElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°`;
    windElement.textContent = `${data.wind.speed} km/h`;
    humidityElement.textContent = `${data.main.humidity} %`;
    visibilityElement.textContent = `${data.visibility/1000} km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();

    time.textContent = currentDate.toTimeString();

    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function(e){
    e.preventDefault();                     // user have to press search icon
    const city = inputElement.value

    if(city!==""){
        fetchWeatherData(city);
        inputElement.value = "";       // after giving output the search box automatically set to empty for further search
    }
});

function getWeatherIconName(weatherCondition){
    const iconMap = {
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}