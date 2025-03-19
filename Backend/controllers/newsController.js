const axios = require('axios');

const NEWS_API_KEY = process.env.NEWS_API_KEY; // Your NewsAPI key from .env
const BASE_URL = 'https://newsapi.org/v2'; // Base URL for NewsAPI

// Controller to fetch news based on a query
const searchNews = async (req, res) => {
  const { query } = req.query; // Get the query parameter from the request

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required' });
  }

  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        apiKey: NEWS_API_KEY,
        q: query, // Search term for the news articles
        language: 'en', // Set the language to English (optional)
      },
    });

    // If no articles are found
    if (response.data.articles.length === 0) {
      return res.status(404).json({ error: 'No articles found' });
    }

    // Send news articles back to the client
    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news data:', error.message);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
};

module.exports = { searchNews };
