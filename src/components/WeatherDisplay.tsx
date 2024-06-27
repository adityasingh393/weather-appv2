import React from 'react';

interface WeatherDisplayProps {
  weatherData: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  } | null;
  loading: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, loading }) => {
  const averageTemperature = weatherData
    ? (weatherData.temperature_2m_min[0] + weatherData.temperature_2m_max[0]) / 2
    : null;

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        weatherData && (
          <div>
            <p>Min Temperature: {weatherData.temperature_2m_min[0]}°C</p>
            <p>Max Temperature: {weatherData.temperature_2m_max[0]}°C</p>
            <p>Average Temperature: {averageTemperature?.toFixed(2)}°C</p>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherDisplay;

//memo use krna tha pr maine directly store kr di hai
