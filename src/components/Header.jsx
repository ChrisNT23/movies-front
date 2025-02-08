import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import "../styles/Header.css";

const Header = () => {
  const movieCategories = useCategories("movie");
  const tvCategories = useCategories("tv");

  const [showMoviesMenu, setShowMoviesMenu] = useState(false);
  const [showTvMenu, setShowTvMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!user);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth); // Escucha cambios en localStorage

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Elimina usuario
    setIsAuthenticated(false);
    navigate("/login"); // Redirige al login
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🎬 MovieDB</Link>
      </div>

      <nav className="nav-links">
        <div
          className="dropdown"
          onMouseEnter={() => setShowMoviesMenu(true)}
          onMouseLeave={() => setShowMoviesMenu(false)}
        >
          <span className="nav-item">Películas </span>
          {showMoviesMenu && (
            <div className="dropdown-menu">
              {movieCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/movies/category/${category.id}`}
                  className="dropdown-item"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div
          className="dropdown"
          onMouseEnter={() => setShowTvMenu(true)}
          onMouseLeave={() => setShowTvMenu(false)}
        >
          <span className="nav-item">Series </span>
          {showTvMenu && (
            <div className="dropdown-menu">
              {tvCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/series/category/${category.id}`}
                  className="dropdown-item"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {isAuthenticated && (
          <button className="nav-item logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
