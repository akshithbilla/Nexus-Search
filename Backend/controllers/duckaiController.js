const axios = require('axios');
const NodeCache = require('node-cache');  

const DUCKDUCKGO_API_URL = 'https://api.duckduckgo.com/';
const cache = new NodeCache({ stdTTL: 3600 }); 

const searchDuckDuckGo = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required' });
  }

   
  const cachedResult = cache.get(query);
  if (cachedResult) {
    return res.json(cachedResult);
  }

  try {
    const response = await axios.get(DUCKDUCKGO_API_URL, {
      params: { q: query, format: 'json' },
    });

    
    const data = {
      title: response.data.Heading || query,
      description: response.data.Abstract || 'No description available',
      source_url: response.data.AbstractURL || 'No source available',
      image: response.data.Image ? `https://duckduckgo.com${response.data.Image}` : 'No image available',
    };

    // Cache the result
    cache.set(query, data);

    return res.json(data);
  } catch (error) {
    console.error('Error fetching DuckDuckGo data:', error.message);
    return res.status(500).json({ error: 'Failed to fetch DuckDuckGo data' });
  }
};

module.exports = { searchDuckDuckGo };
