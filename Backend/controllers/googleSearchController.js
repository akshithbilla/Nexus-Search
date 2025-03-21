const axios = require('axios');
const NodeCache = require('node-cache');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Store in .env file
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;
const GOOGLE_SEARCH_API_URL = 'https://www.googleapis.com/customsearch/v1';
const cache = new NodeCache({ stdTTL: 3600 });

const fetchgoogleSearchResults = async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Query parameter "query" is required' });

    const cachedResults = cache.get(query);
    if (cachedResults) return res.json(cachedResults);

    try {
        const response = await axios.get(GOOGLE_SEARCH_API_URL, {
            params: {
                key: GOOGLE_API_KEY,
                cx: SEARCH_ENGINE_ID,
                q: query
                
            }
        });

        const results = response.data.items?.map(item => ({
            title: item.title || 'No title available',
            link: item.link || 'No link available',
            snippet: item.snippet || 'No description available'
        })) || [];

        cache.set(query, results);
        res.json(results);
    } catch (error) {
        console.error('Error fetching search results:', error.message);
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
};

module.exports = { fetchgoogleSearchResults };
