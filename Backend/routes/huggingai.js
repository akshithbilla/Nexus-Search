const express = require('express');
const { fetchAIResponse } = require('../controllers/huggingaiController');

const router = express.Router();

// Route for book search
router.get('/search', fetchAIResponse);

module.exports = router;
