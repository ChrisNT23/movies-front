import React from "react";
import { useParams } from "react-router-dom";
import useSeriesByCategory from "../hooks/useSeriesByCategory";
import "../styles/SeriesByCategory.css";

const SeriesByCategory = () => {
  const { id } = useParams(); // Obtiene el ID de la categoría desde la URL
  const { series, loading } = useSeriesByCategory(id);

  return (
    <div className="series-category-container">
      <h2>📺 Series en esta Categoría</h2>

      {loading ? (
        <p>Cargando series...</p>
      ) : series.length > 0 ? (
        <div className="series-grid">
          {series.map((serie) => (
            <div key={serie.id} className="series-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                alt={serie.name}
              />
              <h3>{serie.name}</h3>
              <p>⭐ {serie.vote_average.toFixed(1)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron series en esta categoría.</p>
      )}
    </div>
  );
};

export default SeriesByCategory;
