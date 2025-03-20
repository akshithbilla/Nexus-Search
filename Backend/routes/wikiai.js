const express = require('express');
const { searchWikipedia } = require('../controllers/wikiaiController');

const router = express.Router();

// Route for book search
router.get('/search', searchWikipedia);

module.exports = router;
