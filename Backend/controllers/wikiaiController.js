const axios = require('axios');
const NodeCache = require('node-cache'); // Import caching library

const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary';
const cache = new NodeCache({ stdTTL: 3600 }); // Cache results for 1 hour

const searchWikipedia = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required' });
  }

  // Check cache first
  const cachedResult = cache.get(query);
  if (cachedResult) {
    return res.json(cachedResult);
  }

  const fetchWikipediaData = async (retryCount = 0) => {
    try {
      const response = await axios.get(`${WIKIPEDIA_API_URL}/${encodeURIComponent(query)}`);
      
      // Extract relevant details
      const data = {
        title: response.data.title,
        description: response.data.description || 'No description available',
        extract: response.data.extract || 'No summary available',
        thumbnail: response.data.thumbnail?.source || 'No image available',
        page_url: response.data.content_urls?.desktop?.page || 'No URL available'
      };

      // Cache the result
      cache.set(query, data);

      return res.json(data);
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < 5) {
        const retryAfter = error.response.headers['retry-after']
          ? parseInt(error.response.headers['retry-after']) * 1000
          : (2 ** retryCount) * 1000;
        console.warn(`Rate limit hit. Retrying after ${retryAfter} ms...`);
        setTimeout(() => fetchWikipediaData(retryCount + 1), retryAfter);
      } else if (retryCount >= 5) {
        console.error('Maximum retries reached. Giving up.');
        return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
      } else {
        console.error('Error fetching Wikipedia data:', error.message);
        return res.status(500).json({ error: 'Failed to fetch Wikipedia data' });
      }
    }
  };

  fetchWikipediaData();
};

module.exports = { searchWikipedia };
