require('dotenv').config();
const axios = require('axios');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const searchYouTube = async (req, res) => {
    const { query, maxResults } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "query" is required' });
    }

    try {
        console.log('API Key:', YOUTUBE_API_KEY);
        console.log('Query:', query);
        console.log('Max Results:', maxResults || 10);

        const response = await axios.get(YOUTUBE_API_URL, {
            params: {
                part: 'snippet',
                q: query,
                maxResults: maxResults || 10,
                key: YOUTUBE_API_KEY,
            },
            headers: {
                Referer: 'http://localhost:2500/',
            }
        });

        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);

        const videos = response.data.items.map(video => ({
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnail: video.snippet.thumbnails.default.url,
            link: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        }));

        res.json(videos);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Error Response Data:', error.response.data);
            console.error('Error Status:', error.response.status);
            console.error('Error Headers:', error.response.headers);
        }
        res.status(500).json({ error: 'Failed to fetch YouTube videos' });
    }
};

module.exports = { searchYouTube };
