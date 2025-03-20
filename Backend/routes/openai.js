const express = require('express');
const { searchOpenAI } = require('../controllers/openaiController');

const router = express.Router();

// Route for book search
router.get('/search', searchOpenAI);

module.exports = router;
