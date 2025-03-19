// utils/indexData.js
const axios = require('axios');
const client = require('./elasticClient');
require('dotenv').config();

const indexData = async () => {
  const apis = [
    { name: 'books', url: 'http://localhost:2500/api/books?query=example' },
    { name: 'images', url: 'http://localhost:2500/api/images?query=example' },
    { name: 'jobs', url: 'http://localhost:2500/api/jobs?query=example' },
    { name: 'movies', url: 'http://localhost:2500/api/movies?query=example' },
    { name: 'news', url: '  http://localhost:2500/api/news/search?query=education' },
    { name: 'places', url: 'http://localhost:2500/api/places?query=example' },
    { name: 'recipes', url: 'http://localhost:2500/api/recipes?query=example' },
    { name: 'shopping', url: 'http://localhost:2500/api/shopping?query=example' },
    { name: 'songs', url: 'http://localhost:2500/api/songs?query=example' },
    { name: 'weather', url: 'http://localhost:2500/api/weather?query=example' },
    { name: 'youtube', url: 'http://localhost:2500/api/youtube?query=example' }
  ];

  for (const api of apis) {
    try {
      const response = await axios.get(api.url);
      const data = response.data;

      for (const item of data) {
        try {
          await client.index({
            index: api.name,
            body: item
          });
          console.log(`Indexed data from ${api.name}`);
        } catch (indexError) {
          console.error(`Failed to index data from ${api.name}:`, indexError.message);
        }
      }

    } catch (fetchError) {
      console.error(`Failed to fetch data from ${api.name}:`, fetchError.message);
    }
  }
};

indexData();
