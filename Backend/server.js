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
const {fetchAIResponse} =require('./controllers/huggingaiController')
const {searchWikipedia} =require('./controllers/wikiaiController')
const {searchDuckDuckGo}  =require('./controllers/duckaiController')
const {searchOpenAI} =require('./controllers/openaiController')
const {fetchgoogleSearchResults} =require('./controllers/googleSearchController')

//-----------------------------------------------------------------------------------
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
const huggingai=require('./routes/huggingai')
const wikiai=require('./routes/wikiai')
const duckai=require('./routes/duckai')
const openai=require('./routes/openai')
const googleSearch=require('./routes/googleSearch')
const app = express();



//-------------------------------------------------------------------------------------
// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

//------------------------------------------------------------------------------------
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
app.use('/api/huggingai',huggingai)
app.use('/api/wikiai',wikiai)
app.use('/api/duckai',duckai)
app.use('/api/openai',openai)
app.use('/api/googlesearch',googleSearch)

//-------------------------------------------------------------------------
 
app.get('/api/searchBooks', searchBooks);
app.get('/api/searchImages', searchImages);
app.get('/api/searchJobs', searchJobs);
app.get('/api/searchMovies', searchMovie);
app.get('/api/searchNews', searchNews);
app.get('/api/searchPlaces', searchPlaces);
app.get('/api/searchRecipe', searchRecipe);
app.get('/api/searchShopping', searchShopping);
app.get('/api/searchSong',searchSong)
app.get('/api/fetchAIResponse',fetchAIResponse);
app.get('/api/searchWikipedia',searchWikipedia)
app.get('/api/searchDuckDuckGo',searchDuckDuckGo)
app.get('/api/searchOpenAI',searchOpenAI)
app.get('/api/fetchgoogleSearchResults',fetchgoogleSearchResults)

app.get('/', (req, res) => {
  res.send("<h1>Connected</h1>");
});
 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 2500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
