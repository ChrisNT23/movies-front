import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Usa tu API Key desde .env
const BASE_URL = "https://api.themoviedb.org/3";

const useMoviesByCategory = (categoryId) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
          params: { api_key: API_KEY, language: "es-ES", with_genres: categoryId },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("🚨 Error obteniendo películas por categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchMovies();
    }
  }, [categoryId]);

  return { movies, loading };
};

export default useMoviesByCategory;
