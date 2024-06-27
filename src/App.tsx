import React, { useState } from 'react';
import './App.css';
import CitySelector from './components/CitySelector';
import WeatherDisplay from './components/WeatherDisplay';
import useFetchWeather from './hooks/useFetchWeather';

const App: React.FC = () => {
  const savedCity = localStorage.getItem('lastCity');
  const savedLat = localStorage.getItem('lastLat');
  const savedLng = localStorage.getItem('lastLng');
  const [city, setCity] = useState<string>(savedCity || '');
  const [latitude, setLatitude] = useState<string>(savedLat || '');
  const [longitude, setLongitude] = useState<string>(savedLng || '');

  const { weatherData, loading } = useFetchWeather(latitude, longitude);

  const handleSetCity = (cityName: string, lat: string, lng: string) => {
    setCity(cityName);
    setLatitude(lat);
    setLongitude(lng);
    localStorage.setItem('lastCity', cityName);
    localStorage.setItem('lastLat', lat);
    localStorage.setItem('lastLng', lng);
  };

  return (
    <div className="App">
      <h1>Weather Widget</h1>
      <CitySelector setCity={handleSetCity} />
      <WeatherDisplay weatherData={weatherData} loading={loading} />
    </div>
  );
};

export default App;


