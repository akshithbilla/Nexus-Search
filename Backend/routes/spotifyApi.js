const express = require('express');
const { searchSong } = require('../controllers/spotifyController');

const router = express.Router();

// Route for searching songs
router.get('/search', searchSong);

module.exports = router;
