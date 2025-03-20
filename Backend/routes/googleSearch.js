const express = require('express');
const { fetchgoogleSearchResults } = require('../controllers/googleSearchController');

const router = express.Router();

// Route for book search
router.get('/search', fetchgoogleSearchResults);

module.exports = router;
