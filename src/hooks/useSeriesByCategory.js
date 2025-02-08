import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Usa tu API Key desde .env
const BASE_URL = "https://api.themoviedb.org/3";

const useSeriesByCategory = (categoryId) => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/discover/tv`, {
          params: { api_key: API_KEY, language: "es-ES", with_genres: categoryId },
        });
        setSeries(response.data.results);
      } catch (error) {
        console.error("🚨 Error obteniendo series por categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchSeries();
    }
  }, [categoryId]);

  return { series, loading };
};

export default useSeriesByCategory;
