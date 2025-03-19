import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [movie, setMovie] = useState(null);
  const [query, setQuery] = useState('');

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=3cdf70c4&t=${query}`
      );
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovie();
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
  <h1>Movie Search</h1>
  <form onSubmit={handleSearch}>
    <input
      type="text"
      placeholder="Enter movie title"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <button type="submit">Search</button>
  </form>

  {movie && (
    <div className="movie-container">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="movie-details">
        <h2>Movie Title: {movie.Title}</h2>
        <h2>Release Year: {movie.Year}</h2>
        <h2>Movie Description: {movie.Plot}</h2>
      </div>
    </div>
  )}
</div>

  );
};

export default Home;