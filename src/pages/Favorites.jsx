import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../styles/Home.css"; // Reutilizamos los estilos de Home

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    return (
        <div className="home-container">
            <h2>⭐ Películas Favoritas</h2>

            {favorites.length > 0 ? (
                <div className="movies-grid">
                    {favorites.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p className="no-results">No tienes películas favoritas aún.</p>
            )}
        </div>
    );
};

export default Favorites;
