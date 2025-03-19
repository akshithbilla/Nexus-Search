require('dotenv').config();
const axios = require('axios');

const SERA_API_KEY = process.env.SERA_API_KEY;
const GOOGLE_SHOPPING_API_URL = 'https://serpapi.com/search?engine=google_shopping';

const searchShopping = async (req, res) => {
    const { query, location, google_domain, gl, hl, lr } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "query" is required' });
    }

    try {
        const response = await axios.get(GOOGLE_SHOPPING_API_URL, {
            params: {
                q: query,
                location: location || '',
                google_domain: google_domain || 'google.com',
                gl: gl || 'us',
                hl: hl || 'en',
                lr: lr || '',
                api_key: SERA_API_KEY,
            },
        });

        const shoppingResults = response.data.shopping_results.map(result => ({
            title: result.title,
            price: result.price,
            link: result.link,
            source: result.source,
            thumbnail: result.thumbnail,
        }));

        res.json(shoppingResults);
    } catch (error) {
        console.error('Error fetching shopping results:', error.message);
        res.status(500).json({ error: 'Failed to fetch shopping results' });
    }
};

module.exports = { searchShopping };
