const express = require('express');
const { searchRecipe } = require('../controllers/recipeController');

const router = express.Router();

// Route for searching recipes
router.get('/search', searchRecipe);

module.exports = router;
