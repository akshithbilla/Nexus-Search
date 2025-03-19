const axios = require('axios');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const searchWeather = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric', // Get temperature in Celsius
      },
    });

    res.json(response.data); // Send weather data to the client
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { searchWeather };
