require('dotenv').config();
const axios = require('axios');

const PLACES_API_KEY = process.env.PLACES_API_KEY;

const searchPlaces = async (req, res) => {
    const { query, limit } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "query" is required' });
    }

    try {
        const response = await axios.get('https://api.geoapify.com/v2/places', {
            params: {
                text: query,
                limit: limit || 20,
                apiKey: PLACES_API_KEY,
            },
        });

        const places = response.data.features.map(place => ({
            name: place.properties.name,
            address: place.properties.address_line1,
            city: place.properties.city,
            state: place.properties.state,
            country: place.properties.country,
            lat: place.geometry.coordinates[1],
            lon: place.geometry.coordinates[0],
        }));

        res.json(places);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: 'Failed to search for places' });
        }
    }
};

module.exports = { searchPlaces };
