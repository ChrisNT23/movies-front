import { useState, useEffect } from "react";
import moviesApi from "../api/moviesApi";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await moviesApi.get("/movie/popular");
        setMovies(response.data.results);
      } catch (error) {
        console.error("❌ Error al obtener películas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading };
};

export default useMovies;
