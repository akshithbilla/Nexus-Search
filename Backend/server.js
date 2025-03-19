require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { searchNews } = require('./controllers/newsController');
const { searchMovie } = require('./controllers/moviesController'); 
const { searchBooks } = require('./controllers/booksController'); 
const { searchImages } = require('./controllers/imagesController');
 const { searchJobs } = require('./controllers/jobsController');
 const { searchPlaces } = require('./controllers/placesController');
 const { searchRecipe } = require('./controllers/recipeController');
 const { searchShopping } = require('./controllers/shoppingController');
const {searchSong}= require('./controllers/spotifyController')

const api = require('./routes/movies');
const newsApi = require('./routes/news');
const weatherApi = require('./routes/weather');
const booksApi = require('./routes/booksApi');
const imagesApi = require('./routes/imagesApi');
const jobsApi = require('./routes/jobsApi');
const shoppingApi = require('./routes/shoppingApi');
const youtubeApi = require('./routes/youtubeApi');
const spotifyApi = require('./routes/spotifyApi');
const recipeApi = require('./routes/recipeApi');
const placesApi = require('./routes/placesApi');
 

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/weather', weatherApi);
app.use('/api/movies', api);
app.use('/api/news', newsApi);
app.use('/api/books', booksApi);
app.use('/api/images', imagesApi);
app.use('/api/jobs', jobsApi);
app.use('/api/shopping', shoppingApi);
app.use('/api/youtube', youtubeApi);
app.use('/api/spotify', spotifyApi);
app.use('/api/recipes', recipeApi);
app.use('/api/places', placesApi);

//app.use('/api/search', searchApi); // Add the search route
app.get('/api/searchBooks', searchBooks);
app.get('/api/searchImages', searchImages);
app.get('/api/searchJobs', searchJobs);
app.get('/api/searchMovies', searchMovie);
app.get('/api/searchNews', searchNews);
app.get('/api/searchPlaces', searchPlaces);
app.get('/api/searchRecipe', searchRecipe);
app.get('/api/searchShopping', searchShopping);
app.get('/api/searchSong',searchSong)



app.get('/', (req, res) => {
  res.send("<h1>Connected</h1>");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 2500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
