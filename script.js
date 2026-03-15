const apiKey = '4a4f4aaf994d4153c460a4bdca756aa8';
const city = 'Pune';

// API URLs
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

async function getWeather() {
    try {
        // Fetch current weather
        const weatherResponse = await fetch(currentWeatherUrl);
        const weatherData = await weatherResponse.json();

        // Update current weather details
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const weatherIcon = getWeatherIcon(description);

        document.getElementById('weather-icon').textContent = weatherIcon;
        document.getElementById('current-temp').textContent = `${temperature}°C`;
        document.getElementById('weather-desc').textContent = `Description: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
        document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
        document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} m/s`;

        // Simulate weather alerts
        const alertsDiv = document.getElementById('alerts');
        if (temperature > 30) {
            alertsDiv.innerHTML = `
                <p>⚠️ High Temperature Alert: ${temperature}°C</p>
                <p>Stay hydrated and avoid direct sunlight.</p>
            `;
        } else if (windSpeed > 10) {
            alertsDiv.innerHTML = `
                <p>⚠️ High Wind Speed Alert: ${windSpeed} m/s</p>
                <p>Secure outdoor items and be cautious.</p>
            `;
        } else {
            alertsDiv.innerHTML = '<p>No active weather alerts.</p>';
        }

        // Add 'show' class for fade-in effect
        document.getElementById('live-temp').classList.add('show');
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('current-temp').textContent = 'Unavailable';
        document.getElementById('weather-desc').textContent = 'Description: Unavailable';
        document.getElementById('humidity').textContent = 'Humidity: Unavailable';
        document.getElementById('wind-speed').textContent = 'Wind Speed: Unavailable';
        document.getElementById('alerts').innerHTML = '<p>Unable to fetch alerts.</p>';
    }
}

async function getForecast() {
    try {
        // Fetch 5-day forecast
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Filter to get one forecast per day (at 12:00 PM)
        const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);

        // Update forecast section
        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = dailyForecasts.map(forecast => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const temp = forecast.main.temp;
            const description = forecast.weather[0].description;
            const icon = getWeatherIcon(description);
            return `
                <div class="forecast-card">
                    <p>${date}</p>
                    <p class="weather-icon">${icon}</p>
                    <p>${temp}°C</p>
                    <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error fetching forecast:', error);
        document.getElementById('forecast').innerHTML = '<p>Unable to load forecast.</p>';
    }
}

// Map weather conditions to emoji icons
function getWeatherIcon(description) {
    description = description.toLowerCase();
    if (description.includes('clear')) return '☀️';
    if (description.includes('cloud')) return '☁️';
    if (description.includes('rain')) return '🌧️';
    if (description.includes('thunder')) return '⛈️';
    return '🌤️';
}

// Load data when the page loads
window.onload = function() {
    getWeather();
    getForecast();
};