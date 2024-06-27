import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface WeatherData {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

const useFetchWeather = (latitude: string, longitude: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1`
      );
      setWeatherData(response.data.daily);
      setLoading(false);
    } catch  (error) {
      console.error('Error fetching weather data: ', error);
      setLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 10*1000);

    return () => clearInterval(interval);
  }, []);

  return { weatherData, loading };
};

export default useFetchWeather;

//yaha humne useEffect se data fetch kiya and well update the values accordingly 
//then in app.jsx we have imported this fucntion to det the data and as well the loading for the loader
