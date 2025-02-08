import React from "react";
import { useNavigate } from "react-router-dom";
import useMovies from "../hooks/useMovies"; // Hook para obtener películas
import MovieCard from "../components/MovieCard"; // Importamos MovieCard
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();
    const { movies, loading } = useMovies(); // Obtener películas
    const user = JSON.parse(localStorage.getItem("user")); // Obtener usuario autenticado

    return (
        <div className="home-container">
            <header className="hero-section">
                <div className="hero-content">
                    <h1>🎬 Bienvenido, {user ? user.nombre : "Invitado"} 👋</h1>
                    <p>Explora y descubre las mejores películas en un solo lugar.</p>

                    <button className="explore-button" onClick={() => navigate("/movies")}>
                        Explorar Películas
                    </button>
                </div>
            </header>

            <section className="features">
                <div className="feature-card">
                    <h3>🔎 Busca tu Película</h3>
                    <p>Encuentra cualquier película con nuestro buscador inteligente.</p>
                </div>
                <div className="feature-card">
                    <h3>⭐ Favoritos</h3>
                    <p>Guarda y accede fácilmente a tus películas favoritas.</p>
                </div>
            </section>

            <section className="movies-list">
                <h2>🔥 Películas Populares</h2>

                {loading ? (
                    <p className="loading-text">Cargando películas...</p>
                ) : (
                    <div className="movies-grid">
                        {movies.slice(0, 20).map((movie) => ( // Se asegura que no haya demasiadas tarjetas cargadas
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
