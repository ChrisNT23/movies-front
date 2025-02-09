import React from "react";
import { useNavigate } from "react-router-dom";
import useMovies from "../hooks/useMovies"; 
import MovieCard from "../components/MovieCard"; 
import "../styles/Home.css";

const Home = ({ searchTerm }) => {
    const navigate = useNavigate();
    const { movies, loading } = useMovies();
    const user = JSON.parse(localStorage.getItem("user"));

    // Filtrar películas basadas en la búsqueda global
    const filteredMovies = (movies || []).filter((movie) =>
        movie?.title?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
    );
    

    return (
        <div className="home-container">
            <header className="hero-section">
                <div className="hero-content">
                    <h1>🎬 Bienvenido, {user ? user.nombre : "Invitado"} 👋</h1>
                    <p>Explora y descubre las mejores películas en un solo lugar.</p>

                    <div className="button-container">
                        <button className="explore-button" onClick={() => navigate("/movies")}>
                            Explorar Películas
                        </button>
                        <button className="favorites-button" onClick={() => navigate("/favorites")}>
                            ⭐ Favoritos
                        </button>
                    </div>
                </div>
            </header>

            <section className="movies-list">
                <h2>🔥 Películas Populares</h2>

                {loading ? (
                    <p className="loading-text">Cargando películas...</p>
                ) : (
                    <div className="movies-grid">
                        {filteredMovies.length > 0 ? (
                            filteredMovies.slice(0, 20).map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                        ) : (
                            <p className="no-results">No se encontraron películas.</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
