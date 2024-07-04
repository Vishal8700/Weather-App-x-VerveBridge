import React from 'react';

const Footer = () => {
  return (
    <footer className="App-footer">
      < p className="footer">&copy; {new Date().getFullYear() } Weather App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
