require('dotenv').config();
const axios = require('axios');

const PIXABAY_API_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const searchImages = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "query" is required' });
    }

    try {
        const response = await axios.get(PIXABAY_API_URL, {
            params: {
                key: PIXABAY_API_KEY,
                q: query,
                image_type: 'photo',
                 
            },
        });

        const images = response.data.hits.map(image => ({
            title: image.tags,
            link: image.largeImageURL,
            thumbnail: image.previewURL,
        }));

        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error.message);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
};

module.exports = { searchImages };
