import React from "react";
import { Link } from "react-router-dom";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <div className="movie-card-image">
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.png"}
                    alt={movie.title}
                />
            </div>
            <div className="movie-card-content">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</p>
                <Link to={`/movie/${movie.id}`} className="details-button">
                    Ver Detalles
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;
