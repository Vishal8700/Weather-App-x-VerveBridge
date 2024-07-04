// src/components/weather/Weather.js
import React, { useEffect, useState } from 'react';
import './weather.css';

const Weather = ({ initialCity }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(initialCity || 'auto:ip');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4e351bb1708043498d182233240307&q=${query}&days=7`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData(data.current);
        setForecastData(data.forecast);
        setLocation(data.location);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeather();
  }, [query]);

  useEffect(() => {
    if (initialCity) {
      setQuery(initialCity);
    }
  }, [initialCity]);

  return (
    <div className="weather-container">
      {error && <div>Error: {error}</div>}
      {!weatherData && !error && <div>Loading...</div>}

      {weatherData && (
        <div className="weather-info">
          <h2>Weather in {location?.name || 'Unknown Location'}</h2>
          <p>Temperature: {weatherData?.temp_c}°C</p>
          <p>Condition: {weatherData?.condition?.text}</p>
          <img src={weatherData?.condition?.icon} alt="weather icon" />
        </div>
      )}

      {forecastData && (
        <div className="forecast-container">
          <h3>Hourly Forecast</h3>
          <div className="hourly-forecast">
            {forecastData.forecastday[0]?.hour.map((hour) => (
              <div key={hour.time_epoch} className="hour">
                <p>{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>{hour.temp_c}°C</p>
                <img src={hour.condition.icon} alt="hourly weather icon" />
                <p>{hour.condition.text}</p>
              </div>
            ))}
          </div>

          <h3>7-Day Forecast</h3>
          <div className="daily-forecast">
            {forecastData.forecastday.map((day) => (
              <div key={day.date} className="day">
                <p>{new Date(day.date).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                <p>Max: {day.day.maxtemp_c}°C</p>
                <p>Min: {day.day.mintemp_c}°C</p>
                <img src={day.day.condition.icon} alt="daily weather icon" />
                <p>{day.day.condition.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
