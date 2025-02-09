import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // Verificar si la película está en favoritos al cargar
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some(fav => fav.id === movie.id));
    }, [movie.id]);

    // Manejar el clic en la estrella para agregar o quitar de favoritos
    const handleFavoriteClick = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (isFavorite) {
            favorites = favorites.filter(fav => fav.id !== movie.id);
        } else {
            favorites.push(movie);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="movie-card">
            <div className="movie-card-image">
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.png"}
                    alt={movie.title}
                />
                {/* Estrella de favoritos */}
                <span className={`favorite-star ${isFavorite ? "active" : ""}`} onClick={handleFavoriteClick}>
                    ⭐
                </span>
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
