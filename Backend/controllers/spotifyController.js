require('dotenv').config();
const axios = require('axios');

const getSpotifyToken = async () => {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
            grant_type: 'client_credentials'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
        }
    });
    return tokenResponse.data.access_token;
};

const searchSong = async (req, res) => {
    const { query, market } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "query" is required' });
    }

    try {
        const token = await getSpotifyToken();
        console.log('Spotify Token:', token);

        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                q: query,
                type: 'track',
                market: market || 'US',
                 
            }
        });

        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);

        const track = response.data.tracks.items[0];

        const tracks = response.data.tracks.items.map(track => ({
            title: track.name,
            artists: track.artists.map(artist => artist.name).join(', '),
            album: track.album.name,
            release_date: track.album.release_date,
            duration: track.duration_ms,
            popularity: track.popularity,
            preview_url: track.preview_url,
            external_urls: track.external_urls.spotify,
            images: track.album.images
        }));
        
        res.json({ tracks });
        
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Error Response Data:', error.response.data);
            console.error('Error Status:', error.response.status);
            console.error('Error Headers:', error.response.headers);
        }
        res.status(500).json({ error: 'Failed to search for song' });
    }
};

module.exports = { searchSong };
