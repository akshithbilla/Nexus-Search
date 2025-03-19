const express = require('express');
const { searchShopping } = require('../controllers/shoppingController');

const router = express.Router();

// Route for shopping search
router.get('/search', searchShopping);

module.exports = router;
