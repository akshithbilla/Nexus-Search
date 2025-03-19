const express = require('express');
const { searchYouTube } = require('../controllers/youtubeController');

const router = express.Router();

// Route for YouTube search
router.get('/search', searchYouTube);

module.exports = router;
