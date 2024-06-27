import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import cityData from '../cities.json';


interface CitySelectorProps {
  setCity: (cityName: string, lat: string, lng: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ setCity }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCity(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const city = cityData.find(city => city.city === selectedCity);
    if (city) {
      setCity(city.city, city.lat, city.lng);
    } else {
      setError('Please select a city');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel className='city'>City</InputLabel>
        <Select
          value={selectedCity}
          onChange={handleChange}
        >
          {cityData.map(city => (
            <MenuItem key={city.city} value={city.city}>
              {city.city}
            </MenuItem>
          ))}
        </Select>
        {error && <div>{error}</div>}
        <Button type="submit" color="primary" variant="outlined">
          Know Weather
        </Button>
      </FormControl>
    </form>
  );
};

export default CitySelector;

//humne phele ek city select ki then button pressed after that handleSubmit gets triggered
// fir uske baad data se lat and longitude and city name is extracted