import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NavBar.css";

const NavBar = () => {
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [images, setImages] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [news, setNews] = useState([]);
  const [movie, setMovies] = useState([]);
  const [spotifySongs, setSpotifySongs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [shopping, setShopping] = useState([]);
  const [dictionaryData, setDictionaryData] = useState(null);
  const [category, setCategory] = useState("home");

  // Apply theme on page load
  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Function to handle search
  const handleSearch = async () => {
    console.log("Search triggered with query:", searchQuery);

    const requests = [
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`)
        .then((res) => setDictionaryData(res.data))
        .catch(() => setDictionaryData(null)),

      axios
        .get("https://nexus-search.onrender.com/api/searchBooks", {
          params: { query: searchQuery },
        })
        .then((res) => setBooks(res.data))
        .catch(() => setBooks([])),

      axios
        .get("https://nexus-search.onrender.com/api/searchNews", {
          params: { query: searchQuery },
        })
        .then((res) => setNews(res.data))
        .catch(() => setNews([])),

      axios
        .get("https://nexus-search.onrender.com/api/searchJobs", {
          params: { query: searchQuery },
        })
        .then((res) => setJobs(res.data))
        .catch(() => setJobs([])),

      axios
        .get("https://nexus-search.onrender.com/api/searchMovies", {
          params: { query: searchQuery },
        })
        .then((res) => setMovies(res.data))
        .catch(() => setMovies([])),

      axios
        .get("https://nexus-search.onrender.com/api/searchSong", {
          params: { query: searchQuery },
        })
        .then((res) => setSpotifySongs([res.data]))
        .catch(() => setSpotifySongs([])),

      axios
        .get("https://nexus-search.onrender.com/api/searchImages", {
          params: { query: searchQuery },
        })
        .then((res) => setImages(res.data))
        .catch(() => setImages([])),

      axios
        .get("https://nexus-search.onrender.com/api/searchRecipe", {
          params: { query: searchQuery },
        })
        .then((res) => setRecipes(res.data))
        .catch(() => setRecipes([])),

      axios
        .get("https://nexus-search.onrender.com/api/searchShopping", {
          params: { query: searchQuery },
        })
        .then((res) => setShopping(res.data))
        .catch(() => setShopping([])),
    ];

    try {
      await Promise.allSettled(requests);
      console.log("All API requests completed, even if some failed.");
    } catch (error) {
      console.error("Error occurred in one or more APIs:", error.message);
    }
  };

  return (
    <div className={`app ${theme}`}>
      <nav className="navbar">
        <div className="navbar-top">
          <div className="logo">Nexus Search</div>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search the web"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

        <div className="navbar-bottom">
          <ul className="navbar-menu">
            <li onClick={() => setCategory("home")}>Definition</li>
            <li onClick={() => setCategory("books")}>Books</li>
            <li onClick={() => setCategory("images")}>Images</li>
            <li onClick={() => setCategory("jobs")}>Jobs</li>
            <li onClick={() => setCategory("news")}>News</li>
            <li onClick={() => setCategory("movie")}>Movie</li>
            <li onClick={() => setCategory("recipe")}>Recipe</li>
            <li onClick={() => setCategory("shopping")}>Shopping</li>
            <li onClick={() => setCategory("YouTube")}>YouTube</li>
            <li onClick={() => setCategory("Spotify")}>Spotify</li>
          </ul>
        </div>
      </nav>

      <div className="search-results">
        {/* Dictionary Results */}
        {category === "home" && (
          <div className="dictionary-results">
            {dictionaryData ? (
              dictionaryData.map((entry, index) => (
                <div key={index} className="dictionary-entry">
                  <h2>{entry.word}</h2>
                  <p className="phonetic">{entry.phonetic || "N/A"}</p>
                  {entry.phonetics.map((phonetic, idx) => (
                    <div key={idx}>
                      {phonetic.audio && (
                        <audio controls>
                          <source src={phonetic.audio} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                    </div>
                  ))}
                  {entry.meanings.map((meaning, idx) => (
                    <div key={idx} className="meaning">
                      <h3>{meaning.partOfSpeech}</h3>
                      {meaning.definitions.map((def, defIdx) => (
                        <div key={defIdx} className="definition">
                          <p>{def.definition}</p>
                          {def.example && <p className="example">Example: {def.example}</p>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No dictionary data found.</p>
            )}
          </div>
        )}

        {/* Books */}
        {category === "books" && (
          <div className="books-grid">
            {books.length > 0 ? (
              books.map((book, index) => (
                <div key={index} className="book-card">
                  <img src={book.thumbnail} alt={book.title} />
                  <h3>{book.title}</h3>
                  <p>{book.authors.join(", ")}</p>
                  <p>{book.description}</p>
                </div>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        )}

        {/* Images */}
        {category === "images" && (
          <div className="images-grid">
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className="image-card">
                  <img src={image.thumbnail} alt={image.title} />
                  <a href={image.link} target="_blank" rel="noopener noreferrer">
                    View Image
                  </a>
                </div>
              ))
            ) : (
              <p>No images found.</p>
            )}
          </div>
        )}

        {/* Jobs */}
        {category === "jobs" && (
          <div className="jobs-list">
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div key={index} className="job-card">
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    View Job
                  </a>
                </div>
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
        )}

        {/* News */}
        {category === "news" && (
          <div className="news-grid">
            {news.length > 0 ? (
              news.map((article, index) => (
                <div key={index} className="news-card">
                  <img src={article.urlToImage} alt={article.title} />
                  <h3>{article.title}</h3>
                  <p>{article.source.name}</p>
                  <p>{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                </div>
              ))
            ) : (
              <p>No news found.</p>
            )}
          </div>
        )}

        {/* Movies */}
        {category === "movie" && (
          <div className="movie-details">
            {movie?.Title ? (
              <div className="movie-card">
                <img src={movie.Poster} alt={movie.Title} />
                <h2>
                  {movie.Title} ({movie.Year})
                </h2>
                <p>Director: {movie.Director}</p>
                <p>Genre: {movie.Genre}</p>
                <p>Plot: {movie.Plot}</p>
              </div>
            ) : (
              <p>No movie found.</p>
            )}
          </div>
        )}

        {/* Recipes */}
        {category === "recipe" && (
          <div className="recipes-grid">
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <h3>{recipe.title}</h3>
                  <p>Ingredients: {recipe.ingredients}</p>
                  <p>Instructions: {recipe.instructions}</p>
                </div>
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        )}

        {/* Shopping */}
        {category === "shopping" && (
          <div className="shopping-grid">
            {shopping.length > 0 ? (
              shopping.map((item, index) => (
                <div key={index} className="shopping-card">
                  <img src={item.thumbnail} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p>Price: {item.price}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    Buy Now
                  </a>
                </div>
              ))
            ) : (
              <p>No shopping results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;