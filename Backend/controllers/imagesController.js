require('dotenv').config();
const axios = require('axios');

const GOOGLE_IMAGES_API_KEY = process.env.SERA_API_KEY;
const GOOGLE_IMAGES_API_URL = 'https://serpapi.com/search?engine=google_images';

const searchImages = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "query" is required' });
    }

    try {
        const response = await axios.get(GOOGLE_IMAGES_API_URL, {
            params: {
                q: query,
                api_key: GOOGLE_IMAGES_API_KEY,
            },
        });

        const images = response.data.images_results.map(image => ({
            title: image.title,
            link: image.link,
            thumbnail: image.thumbnail,
        }));

        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error.message);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
};

module.exports = { searchImages };
