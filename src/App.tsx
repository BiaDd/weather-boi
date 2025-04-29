import { useState, useEffect } from 'react';

import './App.css';
import { WeatherData, LocationData } from './components/WeatherCard';
import WeatherCard from './components/WeatherCard';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherData(position.coords.latitude.toString(), position.coords.longitude.toString());
    }, () => {
      // Default tokyo location
      fetchWeatherData("35.6764", "139.6500");
    });
  }, []);

  const fetchWeatherData = async (latitude: string, longitude: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_WEATHER_API_URL}?key=${import.meta.env.VITE_API_KEY}&q=${latitude},${longitude}&aqi=yes`);
      if (!response.ok) {
        throw Error("Failed to get weather data");
      }
      const data = await response.json();

      setWeatherData(data.current);
      setLocationData(data.location);
    }
    catch (ex: any) {
      console.log(ex);
    }
  }

  return (
    <>
      <div>
        {locationData && weatherData && (
          <div className='weather-data'>
            <WeatherCard
              weather_data={weatherData}
              location_data={locationData}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default App;
