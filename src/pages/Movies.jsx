import React from "react";
import useMovies from "../hooks/useMovies";
import "../styles/Movies.css";

const Movies = () => {
  const { movies, page, setPage, totalPages, loading } = useMovies();

  return (
    <div className="movies-container">
      <h2>🎬 Todas las Películas</h2>

      {loading ? (
        <p>Cargando películas...</p>
      ) : (
        <>
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

          <div className="pagination">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              ⬅ Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page >= totalPages}
            >
              Siguiente ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Movies;
