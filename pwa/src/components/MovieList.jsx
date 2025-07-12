import React, { useState, useEffect } from "react";
import { moviesAPI } from "../api/apiService";
import SkeletonMovieCard from "./SkeletonMovieCard";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await moviesAPI.getMovies();
      setMovies(response.data.movies);
      setError(null);
    } catch (err) {
      setError("Failed to fetch movies");
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="category-section">
          <h3>Loading...</h3>
          <div className="movies-grid">
            {[...Array(6)].map((_, index) => (
              <SkeletonMovieCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-list">
      <h2>Movies</h2>
      {Object.keys(movies).map((category) => (
        <div key={category} className="category-section">
          <h3>{category}</h3>
          <div className="movies-grid">
            {movies[category].map((movie) => (
              <div key={movie.movie_id} className="movie-card">
                <div className="movie-poster">
                  {movie.poster ? (
                    <img src={movie.poster} alt={movie.title} />
                  ) : (
                    <div className="no-poster">No Image</div>
                  )}
                </div>
                <div className="movie-info">
                  <h4>{movie.title}</h4>
                  <p className="movie-author">by {movie.author}</p>
                  <p className="movie-date">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                  <p className="movie-overview">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
