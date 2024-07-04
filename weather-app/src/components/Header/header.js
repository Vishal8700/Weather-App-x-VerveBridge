import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from './logo.png';

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);

  const apiKey = '4e351bb1708043498d182233240307'; // Replace with your WeatherAPI.com API key

  const handleInputChange = async (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (value.trim().length >= 3) {
      try {
        const apiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${value}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCitySuggestions(data);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
        setCitySuggestions([]);
      }
    } else {
      setCitySuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
      setShowSearchPopup(false);
      setCitySuggestions([]);
    }
  };

  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
  };

  return (
    <header className="App-header">
      <div className="header-left" onClick={() => window.location.href = '/'}>
        <img src={logo} alt="Logo" className="app-logo" />
        <h1 className="app-name">Weather App</h1>
      </div>
      <div className="header-right">
        <div className="search-icon" onClick={toggleSearchPopup}>🔍 Search</div>
        <nav>
          <ul className="header-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/extensions">Extensions</Link></li>
          </ul>
        </nav>
      </div>

      {showSearchPopup && (
        <div className="search-popup">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Enter city name"
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          {citySuggestions.length > 0 && (
            <ul className="suggestions-list">
              {citySuggestions.map((city, index) => (
                <li key={index} onClick={() => {
                  setSearchTerm(city.name);
                  onSearch(city.name);
                  setShowSearchPopup(false);
                  setCitySuggestions([]);
                }}>{city.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
