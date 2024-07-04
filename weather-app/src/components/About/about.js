import React from 'react';
import './about.css'

const About = () => {
  return (
    <div className="about-container">
      <h2>About Weather App</h2>
      <p>Welcome to the Weather App, where you can explore accurate weather forecasts for your location and beyond. Powered by WeatherAPI.com, our app ensures you stay informed with reliable weather updates.</p>
      <p>Whether you're planning your day or keeping an eye on the week's weather trends, our app provides detailed forecasts with hourly and daily predictions. Stay prepared for any weather condition with our intuitive interface and responsive design.</p>
      <p>Enjoy exploring the Weather App, where weather forecasting meets simplicity and accuracy.</p>
      
      <h3>About the Developer</h3>
      <p>This app was developed by git_alien, a passionate software developer with expertise in building user-friendly web applications.</p>
      
      <div className="developer-links">
        <p>Find git_alien on:</p>
        <ul>
          <li><a href="https://github.com/Vishal8700" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/vishal-kumar12432/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  );
};

export default About;
