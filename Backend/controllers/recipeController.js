require('dotenv').config();
const axios = require('axios');

const RECIPE_API_KEY = process.env.RECIPE_API_KEY;

const searchRecipe = async (req, res) => {
    const { query, offset } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "query" is required' });
    }

    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/recipe', {
            params: {
                query: query,
                offset: offset || 0,
            },
            headers: {
                'X-Api-Key': RECIPE_API_KEY,
            },
        });

        const recipes = response.data.map(recipe => ({
            title: recipe.title,
            ingredients: recipe.ingredients,
            servings: recipe.servings,
            instructions: recipe.instructions,
        }));

        res.json(recipes);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: 'Failed to search for recipes' });
        }
    }
};

module.exports = { searchRecipe };
