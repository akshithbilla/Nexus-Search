const axios = require('axios');
const NodeCache = require('node-cache'); 

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';
const cache = new NodeCache({ stdTTL: 3600 });  

const searchBooks = async (req, res) => {
  const { query } = req.query; 

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required' });
  }

  
  const cachedBooks = cache.get(query);
  if (cachedBooks) {
    return res.json(cachedBooks);
  }

  const fetchBooks = async (retryCount = 0) => {
    try {
      const response = await axios.get(GOOGLE_BOOKS_API_URL, {
        params: {
          q: query, 
          key: GOOGLE_BOOKS_API_KEY, 
        },
      });

      const books = response.data.items.map((item) => ({
        title: item.volumeInfo.title || 'No title available',
        authors: item.volumeInfo.authors || ['No authors available'],
        description: item.volumeInfo.description || 'No description available',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'No image available',
      }));

      
      cache.set(query, books);

      return res.json(books);
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < 5) {
        const retryAfter = error.response.headers['retry-after']
          ? parseInt(error.response.headers['retry-after']) * 1000
          : (2 ** retryCount) * 1000;
        console.warn(`Rate limit hit. Retrying after ${retryAfter} ms...`);
        setTimeout(() => fetchBooks(retryCount + 1), retryAfter);
      } else if (retryCount >= 5) {
        console.error('Maximum retries reached. Giving up.');
        return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
      } else {
        console.error('Error fetching books:', error.message);
        return res.status(500).json({ error: 'Failed to fetch books' });
      }
    }
  };

  fetchBooks();
};

module.exports = { searchBooks };
