const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Replace with your actual API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }
    fetchWeather(city);
});

async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found. Please try again.");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
        weatherResult.style.display = "block";
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const description = weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <img src="${icon}" alt="Weather Icon">
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Condition:</strong> ${description}</p>
    `;
    weatherResult.style.display = "block";
}
