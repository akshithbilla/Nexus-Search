const express = require('express');
const { searchWeather } = require('../controllers/weatherController');

const router = express.Router();

// Define the weather search route
router.get('/search', searchWeather);

module.exports = router;
