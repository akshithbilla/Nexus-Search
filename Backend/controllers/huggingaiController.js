const axios = require('axios');
const NodeCache = require('node-cache');
require('dotenv').config(); // Load environment variables

const HF_API_KEY = process.env.HF_API_KEY;
const HF_ENDPOINT_URL = 'https://vlzz10eq3fol3429.us-east-1.aws.endpoints.huggingface.cloud/v1/chat/completions'; 

const cache = new NodeCache({ stdTTL: 3600 }); // Cache responses for 1 hour

const fetchAIResponse = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required' });
  }

  // Check cache first
  const cachedResponse = cache.get(query);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  const requestData = {
    model: 'tgi',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: query },
    ],
    stream: false,
  };

  try {
    const response = await axios.post(HF_ENDPOINT_URL, requestData, {
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = response.data.choices[0].message.content;
    cache.set(query, { response: result });

    return res.json({ response: result });
  } catch (error) {
    console.error('Error fetching AI response:', error.response?.status, error.response?.data);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.error || 'Failed to fetch AI response',
    });
  }
};

module.exports = { fetchAIResponse };
