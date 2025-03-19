// utils/testConnection.js
const client = require('./elasticClient');

const testConnection = async () => {
  try {
    const response = await client.ping();
    console.log('Elasticsearch is connected:', response);
  } catch (error) {
    console.error('Elasticsearch connection failed:', error);
  }
};

testConnection();
