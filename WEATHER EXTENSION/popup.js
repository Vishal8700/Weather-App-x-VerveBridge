// Weather API key
const apiKey = '4e351bb1708043498d182233240307';

// Get elements
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const temperatureDisplay = document.getElementById('temperature');
const conditionDisplay = document.getElementById('condition');
const weatherIconDisplay = document.getElementById('weatherIcon');
const cityNameDisplay = document.getElementById('cityName');
const currentCityDisplay = document.getElementById('currentCity');
const suggestionsContainer = document.getElementById('suggestions');

// Event listeners
searchBtn.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    getWeatherByCity(city);
  }
});

// Automatically fetch weather by current location on load
document.addEventListener('DOMContentLoaded', getWeatherByLocation);

// Fetch weather by current location
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

      try {
        cityNameDisplay.textContent = "Continuous Fetching your location's weather...";
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        cityNameDisplay.textContent = 'Failed to fetch weather data.';
      }
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Fetch weather by city name
async function getWeatherByCity(city) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    cityNameDisplay.textContent = `Continuous Fetching weather for ${city}...`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    cityNameDisplay.textContent = 'Failed to fetch weather data.';
  }
}

// Display weather data
function displayWeather(data) {
  const { name } = data.location;
  const { temp_c, condition } = data.current;
  currentCityDisplay.textContent = `Weather in ${name}`;
  temperatureDisplay.textContent = `Temperature: ${temp_c}°C`;
  conditionDisplay.textContent = `Condition: ${condition.text}`;
  weatherIconDisplay.innerHTML = `<img src="${"https:"+condition.icon}" alt="${condition.text} icon">`;
}

// Fetch city suggestions
cityInput.addEventListener('input', async () => {
  const query = cityInput.value;
  if (query.length < 3) {
    suggestionsContainer.style.display = 'none';
    return;
  }

  const apiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displaySuggestions(data);
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
  }
});

// Display city suggestions
function displaySuggestions(suggestions) {
  suggestionsContainer.innerHTML = '';
  if (suggestions.length === 0) {
    suggestionsContainer.style.display = 'none';
    return;
  }

  suggestions.forEach((city) => {
    const suggestionDiv = document.createElement('div');
    suggestionDiv.textContent = city.name;
    suggestionDiv.addEventListener('click', () => {
      cityInput.value = city.name;
      suggestionsContainer.style.display = 'none';
      getWeatherByCity(city.name);
    });
    suggestionsContainer.appendChild(suggestionDiv);
  });

  suggestionsContainer.style.display = 'block';
}
