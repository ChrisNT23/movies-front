import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/MovieDetails.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Reemplaza con tu clave de The MovieDB

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es`
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="movie-details">
      {/* Imagen de fondo en pantalla completa */}
      <div
        className="movie-backdrop"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="overlay">
          <h1>{movie.title}</h1>
          <p className="tagline">{movie.tagline}</p>
        </div>
      </div>

      {/* Contenedor principal con dos columnas */}
      <div className="movie-container">
        {/* Columna izquierda: Póster */}
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        {/* Columna derecha: Información detallada */}
        <div className="movie-info">
          <p><strong>🎬 Título Original:</strong> {movie.original_title}</p>
          <p><strong>📅 Fecha de Estreno:</strong> {movie.release_date}</p>
          <p><strong>⏳ Duración:</strong> {movie.runtime} min</p>
          <p><strong>⭐ Puntuación:</strong> {movie.vote_average} / 10 ({movie.vote_count} votos)</p>
          <p><strong>📖 Sinopsis:</strong> {movie.overview}</p>

          <p><strong>🎭 Géneros:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
          <p><strong>💰 Presupuesto:</strong> ${movie.budget.toLocaleString()}</p>
          <p><strong>💵 Recaudación:</strong> ${movie.revenue.toLocaleString()}</p>
          <p><strong>🎬 Estado:</strong> {movie.status}</p>

          <p><strong>🌍 Países de Producción:</strong> {movie.production_countries.map((c) => c.name).join(", ")}</p>
          <p><strong>🗣 Idiomas Hablados:</strong> {movie.spoken_languages.map((l) => l.name).join(", ")}</p>

          <p><strong>🏢 Productoras:</strong> {movie.production_companies.map((p) => p.name).join(", ")}</p>

          {movie.homepage && (
            <p>
              <strong>🔗 Página Oficial:</strong> <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                {movie.homepage}
              </a>
            </p>
          )}

          {movie.imdb_id && (
            <p>
              <strong>🎥 IMDb:</strong> <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">
                Ver en IMDb
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
