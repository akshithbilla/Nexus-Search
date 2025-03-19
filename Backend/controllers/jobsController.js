require('dotenv').config();
const axios = require('axios');

const SERA_API_KEY = process.env.SERA_API_KEY;
const GOOGLE_JOBS_API_URL = 'https://serpapi.com/search?engine=google_jobs';

const searchJobs = async (req, res) => {
    const { query, location } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "query" is required' });
    }

    try {
        const response = await axios.get(GOOGLE_JOBS_API_URL, {
            params: {
                q: query,
                location: location || '',
                api_key: SERA_API_KEY,
            },
        });

        const jobs = response.data.jobs_results.map(job => ({
            title: job.title,
            company: job.company_name,
            location: job.location,
            link: job.link,
        }));

        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error.message);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

module.exports = { searchJobs };
