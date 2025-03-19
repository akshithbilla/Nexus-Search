const express = require('express');
const { searchNews } = require('../controllers/newsController');

const router = express.Router();

// Define the news search route
router.get('/search', searchNews);

module.exports = router;
