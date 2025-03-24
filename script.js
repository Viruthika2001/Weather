function fetchWeather() {
    const city = document.getElementById("city").value.trim();
    const weatherResult = document.getElementById("weather");

    if (!city) {
        weatherResult.innerText = "Please enter a city name.";
        return;
    }

    const apiKey = "35b1b3b553b1ba5c4976c78132dd76a9"; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found. Try again.");
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const weatherDescription = data.weather[0].description;

            weatherResult.innerHTML = `
                <p>🌡 Temperature: ${temperature}°C</p>
                <p>💧 Humidity: ${humidity}%</p>
                <p>🌤 Condition: ${weatherDescription}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            weatherResult.innerText = error.message;
        });
}
