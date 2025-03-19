const express = require('express');
const { searchImages } = require('../controllers/imagesController');

const router = express.Router();

// Route for image search
router.get('/search', searchImages);

module.exports = router;
