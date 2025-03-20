require('dotenv').config();
const axios = require('axios');
const NodeCache = require('node-cache'); // Import caching library

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const cache = new NodeCache({ stdTTL: 3600 }); // Cache results for 1 hour

const searchOpenAI = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required' });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key is missing' });
  }

  // Check cache first
  const cachedResult = cache.get(query);
  if (cachedResult) {
    return res.json(cachedResult);
  }

  const fetchAIData = async (retryCount = 0) => {
    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: "gpt-3.5-turbo", // Change to "gpt-4" if needed
          messages: [{ role: "user", content: `Provide a brief summary about ${query}.` }],
          max_tokens: 100
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
          }
        }
      );

      // Extract AI response
      const aiResponse = response.data.choices[0].message.content.trim();

      // Prepare response data
      const data = { query, response: aiResponse };

      // Cache the result
      cache.set(query, data);

      return res.json(data);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        // Handle Rate Limit Error (429)
        if (status === 429 && retryCount < 3) {
          const retryAfter = error.response.headers['retry-after']
            ? parseInt(error.response.headers['retry-after']) * 1000
            : (2 ** retryCount) * 1000;

          console.warn(`Rate limit hit. Retrying after ${retryAfter}ms...`);
          setTimeout(() => fetchAIData(retryCount + 1), retryAfter);
        } else {
          console.error('OpenAI API error:', error.response.data);
          return res.status(status).json({ error: error.response.data });
        }
      } else {
        console.error('Request failed:', error.message);
        return res.status(500).json({ error: 'Failed to fetch OpenAI data' });
      }
    }
  };

  fetchAIData();
};

module.exports = { searchOpenAI };
