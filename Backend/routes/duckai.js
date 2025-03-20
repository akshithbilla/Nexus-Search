const express = require('express');
const { searchDuckDuckGo } = require('../controllers/duckaiController');

const router = express.Router();

// Route for book search
router.get('/search', searchDuckDuckGo);

module.exports = router;
