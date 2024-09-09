import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaEye, FaSun, FaTemperatureHigh, FaThermometerHalf, FaTint } from 'react-icons/fa'; // Import icons
import './App.css';

const App = () => {
  const [cityName, setCityname] = useState('');
  const [wdata, setWdata] = useState(null);
  const apikey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const handleclick = async () => {
      if (!cityName) {
        setWdata(null);
        return;
      }
      
      let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`);
      result = await result.json();
      setWdata(result);
    };

    handleclick();
  }, [cityName, apikey]);

  return (
    <div className="container">
      <div className="input-container">
        <h1>Enter a city you want to check weather details of:</h1>
        <input
          className="input-field"
          type="text"
          placeholder="City Name"
          onChange={(e) => setCityname(e.target.value)}
        />
      </div>
      {wdata && (wdata.cod === '400' || wdata.cod === '404') && <p>No city found</p>}
      {wdata && wdata.main && wdata.visibility && (
        <div className="weather-data">
          <p><FaTemperatureHigh /> Temperature: {wdata.main.temp} K</p>
          <p><FaThermometerHalf /> Feels like: {wdata.main.feels_like} K</p>
          <p><FaTint /> Humidity: {wdata.main.humidity}%</p>
          <p><FaArrowDown /> Min temp: {wdata.main.temp_min} K</p>
          <p><FaArrowUp /> Max temp: {wdata.main.temp_max} K</p>
          <p><FaSun /> Sea level: {wdata.main.sea_level} m</p>
          <p><FaSun /> Ground level: {wdata.main.grnd_level} m</p>
          <p><FaEye /> Visibility: {wdata.visibility / 1000} km</p> {/* Convert visibility to km */}
        </div>
      )}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Made by Tarunika</p>
      </footer>
    </div>
  );
};

export default App;
