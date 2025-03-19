const express = require('express');
const { searchJobs } = require('../controllers/jobsController');

const router = express.Router();

// Route for job search
router.get('/search', searchJobs);

module.exports = router;
