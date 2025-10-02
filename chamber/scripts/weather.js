// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData() {
// This would be replaced with actual API call
// API Configuration
const API_KEY = 'e249c35fecac46f7cf9147a6b19688cc'; // my OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city = 'London') {
    try {
        // Fetch current weather data
        const currentWeatherResponse = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!currentWeatherResponse.ok) {
            throw new Error('City not found or API error');
        }
        
        const currentData = await currentWeatherResponse.json();
        
        // Fetch 5-day forecast data
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!forecastResponse.ok) {
            throw new Error('Forecast data not available');
        }
        
        const forecastData = await forecastResponse.json();
        
        // Process the data for UI
        const weatherData = processWeatherData(currentData, forecastData);
        updateWeatherUI(weatherData);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Unable to fetch weather data. Please try again.');
    }
}

// Function to process raw API data into UI-friendly format
function processWeatherData(currentData, forecastData) {
    // Process current weather
    const current = {
        temp: Math.round(currentData.main.temp),
        description: currentData.weather[0].description,
        icon: getWeatherIcon(currentData.weather[0].icon),
        humidity: currentData.main.humidity,
        wind: currentData.wind.speed,
        city: currentData.name,
        country: currentData.sys.country
    };
    
    // Process forecast data (group by day and take one reading per day)
    const dailyForecasts = {};
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
                temp: Math.round(item.main.temp),
                icon: getWeatherIcon(item.weather[0].icon),
                description: item.weather[0].description,
                date: date
            };
        }
    });
    
    // Convert to array and skip today
    const forecastArray = Object.values(dailyForecasts).slice(1, 4);
    const dayNames = ['Tomorrow', 'Day after', 'In 3 days'];
    
    const forecast = forecastArray.map((day, index) => ({
        day: dayNames[index] || new Date(day.date).toLocaleDateString('en', { weekday: 'long' }),
        temp: day.temp,
        icon: day.icon,
        description: day.description
    }));
    
    return {
        current,
        forecast
    };
}

// Function to convert OpenWeatherMap icon codes to emojis
function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': '☀️', // clear sky day
        '01n': '🌙', // clear sky night
        '02d': '🌤️', // few clouds day
        '02n': '🌤️', // few clouds night
        '03d': '☁️', // scattered clouds
        '03n': '☁️', // scattered clouds
        '04d': '☁️', // broken clouds
        '04n': '☁️', // broken clouds
        '09d': '🌧️', // shower rain
        '09n': '🌧️', // shower rain
        '10d': '🌦️', // rain day
        '10n': '🌦️', // rain night
        '11d': '⛈️', // thunderstorm
        '11n': '⛈️', // thunderstorm
        '13d': '❄️', // snow
        '13n': '❄️', // snow
        '50d': '🌫️', // mist
        '50n': '🌫️'  // mist
    };
    
    return iconMap[iconCode] || '🌈';
}

// Function to update weather UI with data
function updateWeatherUI(weatherData) {
    // Update current weather
    document.querySelector('.temperature').textContent = `${weatherData.current.temp}°C`;
    document.querySelector('.weather-desc').textContent = weatherData.current.description;
    document.querySelector('.weather-icon').textContent = weatherData.current.icon;
    document.querySelector('.weather-humidity').textContent = `Humidity: ${weatherData.current.humidity}%`;
    document.querySelector('.weather-wind').textContent = `Wind: ${weatherData.current.wind} km/h`;
    
    // Update location if you have an element for it
    const locationElement = document.querySelector('.weather-location');
    if (locationElement) {
        locationElement.textContent = `${weatherData.current.city}, ${weatherData.current.country}`;
    }
    
    // Update forecast
    const forecastCards = document.querySelectorAll('.forecast-card');
    forecastCards.forEach((card, index) => {
        if (weatherData.forecast[index]) {
            card.querySelector('.forecast-day').textContent = weatherData.forecast[index].day;
            card.querySelector('.forecast-icon').textContent = weatherData.forecast[index].icon;
            card.querySelector('.forecast-temp').textContent = `${weatherData.forecast[index].temp}°C`;
            card.querySelector('.forecast-desc').textContent = weatherData.forecast[index].description;
        }
    });
    
    // Hide loading state if exists
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

// Function to show error messages
function showError(message) {
    const errorElement = document.querySelector('.error-message') || createErrorMessageElement();
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Hide loading state
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

// Function to create error message element if it doesn't exist
function createErrorMessageElement() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #ffebee;
        color: #c62828;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        text-align: center;
    `;
    document.querySelector('.weather-container').prepend(errorDiv);
    return errorDiv;
}

// Function to get weather by user's geolocation
function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                    );
                    const data = await response.json();
                    fetchWeatherData(data.name);
                } catch (error) {
                    console.error('Error fetching weather by location:', error);
                    fetchWeatherData(); // Fallback to default city
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                fetchWeatherData(); // Fallback to default city
            }
        );
    } else {
        fetchWeatherData(); // Fallback to default city
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Try to get weather by user's location, fallback to default city
    getWeatherByGeolocation();
    
    // Add search functionality if you have a search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cityInput = searchForm.querySelector('input[type="text"]');
            if (cityInput.value.trim()) {
                fetchWeatherData(cityInput.value.trim());
                cityInput.value = '';
            }
        });
    }
});
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