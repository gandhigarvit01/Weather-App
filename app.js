const BASE_URL = "https://api.weatherapi.com/v1/current.json?key=f671994a2f584a65b24183129260706&q=";

const btn = document.querySelector("button");
const parent = document.querySelector(".container");

btn.addEventListener("click", generateWeather);

async function generateWeather() {

    let inp = document.querySelector("input");
    let cityName = inp.value.trim();

    if(cityName === "") return;

    try{

        let response = await fetch(`${BASE_URL}${cityName}`);
        let data = await response.json();

        let card = document.createElement("div");
        card.classList.add("weather-card");

        if(data.error){
            let oldCard = document.querySelector(".weather-card");
            if(oldCard){
                oldCard.remove();
            }
            card.innerHTML =`
                <p class="error">
                    ERROR! Please enter a valid city!
                </p>
            `;

            parent.append(card);
            return;
        }

        let city = data.location.name;
        let state = data.location.region;
        let country = data.location.country;

        let icon = data.current.condition.icon;
        let condition = data.current.condition.text;

        let temp = data.current.temp_c;
        let feelsLike = data.current.feelslike_c;
        let humidity = data.current.humidity;
        let wind = data.current.wind_kph;
        let time = data.location.localtime;

        card.innerHTML = `
            <div class="left">
                <img src="https:${icon}">
                <h1>${temp}°C</h1>
                <p>${condition}</p>
            </div>

            <div class="right">
                <div>📍 ${city}, ${state}, ${country}</div>
                <div>🌡️ Temperature: ${temp}°C</div>
                <div>🤗 Feels Like: ${feelsLike}°C</div>
                <div>💧 Humidity: ${humidity}%</div>
                <div>💨 Wind: ${wind} km/h</div>
                <div>🕒 ${time}</div>
            </div>
        `;
        let oldCard = document.querySelector(".weather-card");
            if(oldCard){
                oldCard.remove();
            }
        parent.append(card);

    }
    catch(err){

        console.log(err);

    }
}