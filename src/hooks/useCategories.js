import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Usa tu API Key desde .env
const BASE_URL = "https://api.themoviedb.org/3";

const useCategories = (type) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/genre/${type}/list`, {
          params: { api_key: API_KEY, language: "es-ES" },
        });
        setCategories(response.data.genres);
      } catch (error) {
        console.error(`Error obteniendo categorías de ${type}:`, error);
      }
    };

    fetchCategories();
  }, [type]);

  return categories;
};

export default useCategories;
