import React from 'react';
import './extensions.css';
import extension from '../extensions/icon.png';
import instruction from '../extensions/instruction.webp'
import instruction2 from '../extensions/instruction2.png'

const Extensions = () => {

  const handleDownload = () => {
    const url = `${process.env.PUBLIC_URL}/WEATHER EXTENSION.zip`; // Path to extension.zip in public folder
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'WEATHER EXTENSION.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="extensions-container">
      <header className="extensions-header">
        <h1>Weather App Extensions</h1>
        <p>Enhance your Weather App experience with these powerful extensions!</p>
      </header>
      <section className="extension-card">
        <img src={extension} alt="Extension Preview" className="extension-image" />
        <div className="extension-details">
          <h2>Weather App</h2>
          <p>Enhance your weather experience with our extension, delivering accurate forecasts and personalized updates directly to your browser.</p>
          <div className="download-button">
            <button className="btn btn-primary" onClick={handleDownload}>Download Extension</button>
          </div>
        </div>
        
      </section>
      <section className="howtoinstall">
      <div className='howto'>
            <h2>How to install Chrome extension from a zip file</h2>
            <p>1. Download the extension zip file from the link above and unzip it.</p>
            <p>2. Open the Chrome extension page and turn on "Developer mode"</p>
           <img src={instruction} alt='instruction'></img>
            <p>3. Click on the "Load Unpacked" button and select the extension folder </p>
            <p>4. Click on the "Add" button to install the extension.</p>
            <img src={instruction2} alt='instruction'></img>
            <h3>The extension should now be installed and ready to use.</h3>
        </div>
      </section>
    </div>
  );
};

export default Extensions;
