// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData() {
// This would be replaced with actual API call
// For demonstration, we'll use mock data
    const weatherData = {
        current: {
            temp: 28,
            description: "Sunny",
            icon: "☀️",
            humidity: 75,
            wind: 12
        },
        forecast: [
            { day: "Tomorrow", temp: 27, icon: "🌤️" },
            { day: "Day 2", temp: 26, icon: "⛅" },
            { day: "Day 3", temp: 25, icon: "🌦️" }
        ]
    };
    
    updateWeatherUI(weatherData);
}

// Function to update weather UI with data
function updateWeatherUI(weatherData) {
    document.querySelector('.temperature').textContent = `${weatherData.current.temp}°C`;
    document.querySelector('.weather-desc').textContent = weatherData.current.description;
    document.querySelector('.weather-icon').textContent = weatherData.current.icon;
    document.querySelector('.weather-humidity').textContent = `Humidity: ${weatherData.current.humidity}%`;
    document.querySelector('.weather-wind').textContent = `Wind: ${weatherData.current.wind} km/h`;
    
    const forecastCards = document.querySelectorAll('.forecast-card');
    forecastCards.forEach((card, index) => {
        if (weatherData.forecast[index]) {
            card.querySelector('.forecast-day').textContent = weatherData.forecast[index].day;
            card.querySelector('.forecast-icon').textContent = weatherData.forecast[index].icon;
            card.querySelector('.forecast-temp').textContent = `${weatherData.forecast[index].temp}°C`;
        }
    });
}
// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    
    fetchWeatherData();
    
});