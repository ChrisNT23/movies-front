import React from "react";
import { useParams } from "react-router-dom";
import useMoviesByCategory from "../hooks/useMoviesByCategory";
import "../styles/MoviesByCategory.css";

const MoviesByCategory = () => {
  const { id } = useParams(); // Obtiene el ID de la categoría desde la URL
  const { movies, loading } = useMoviesByCategory(id);

  return (
    <div className="movies-category-container">
      <h2>🎬 Películas en esta Categoría</h2>

      {loading ? (
        <p>Cargando películas...</p>
      ) : movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron películas en esta categoría.</p>
      )}
    </div>
  );
};

export default MoviesByCategory;
