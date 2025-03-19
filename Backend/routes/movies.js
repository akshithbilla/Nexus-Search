const express = require('express');
const { searchMovie } = require('../controllers/moviesController'); 

const router = express.Router();

 
router.get('/search', searchMovie);

module.exports = router;
