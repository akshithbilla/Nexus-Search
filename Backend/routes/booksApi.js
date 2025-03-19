const express = require('express');
const { searchBooks } = require('../controllers/booksController');

const router = express.Router();

// Route for book search
router.get('/search', searchBooks);

module.exports = router;
