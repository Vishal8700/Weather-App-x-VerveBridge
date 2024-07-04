// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/header.js';
import Footer from './components/Footer/footer.js';
import About from './components/About/about.js';
import Weather from './components/weather/weather.js';
import PrivacyPolicy from './components/privacy-policy/PrivacyPolicy.js'; // Adjusted import path
import Extensions from './components/extensions/Extensions.js';

import './App.css';

function App() {
  const [city, setCity] = useState('');

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <Router>
      <div className="App">
        <Header onSearch={handleSearch} />
        <main>
          <Routes>
            <Route path="/" element={<Weather initialCity={city} />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
            <Route path="/extensions" element={<Extensions/>} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
