const axios = require('axios');

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;  
const BASE_URL = 'https://www.omdbapi.com/';  

//Movie Search-----------------------------------------------------------------------
const searchMovie = async (req, res) => {
  const { query } = req.query;  

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required' });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: MOVIE_API_KEY ,   
        t: query,          
      },
    });
    
    if (response.data.Response === 'False') {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie data:', error.message);
    res.status(500).json({ error: 'Failed to fetch movie data' });
  }
};
//-------------------------------------------------------------------------

module.exports = { searchMovie };
