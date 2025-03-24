function fetchWeather() {
    const city = document.getElementById("city").value.trim(); // Fixed: `.trim()` instead of `.tris()`
    
    if (!city) { // Fixed: Corrected if condition
        document.getElementById("weather").innerText = "Please enter a city.";
        return;
    }

    const geoApiUrl = `https://geocoding.api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&format=json`; // Fixed: Corrected URL syntax

    fetch(geoApiUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                document.getElementById("weather").innerText = "City not found.";
                return;
            }

            const lat = data.results[0].latitude;
            const lon = data.results[0].longitude;

            const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

            return fetch(weatherApiUrl);
        })
        .then(response => response.json())
        .then(weatherData => {
            if (!weatherData || !weatherData.current_weather) {
                document.getElementById("weather").innerText = "Weather data not available.";
                return;
            }

            const { temperature, weathercode } = weatherData.current_weather;
            document.getElementById("weather").innerText = `Temperature: ${temperature}°C, Condition: ${weathercode}`;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("weather").innerText = "Error retrieving weather data.";
        });
}


