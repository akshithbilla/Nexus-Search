const express = require('express');
const { searchPlaces } = require('../controllers/placesController');

const router = express.Router();

// Route for searching places
router.get('/search', searchPlaces);

module.exports = router;
