import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    pais: "",
    correo: "",
    contraseña: "",
  });

  const [paises, setPaises] = useState([]); // Estado para almacenar países

  // 📌 Cargar catálogo de países desde una API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data.map((country) => country.name.common).sort();
        setPaises(countryNames);
      } catch (error) {
        console.error("Error al cargar países:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      alert("❌ Error en el registro.");
    }
  };

  return (
    <div className="auth-container">
      <h2>📝 Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
        <input type="tel" name="celular" placeholder="Número de Celular" value={formData.celular} onChange={handleChange} required />

        <select name="pais" value={formData.pais} onChange={handleChange} required>
          <option value="">Selecciona tu país</option>
          {paises.map((pais, index) => (
            <option key={index} value={pais}>{pais}</option>
          ))}
        </select>

        <input type="email" name="correo" placeholder="Correo Electrónico" value={formData.correo} onChange={handleChange} required />
        <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} required />

        <button type="submit">Registrarse</button>
      </form>
      <p className="auth-link">¿Ya tienes cuenta? <span onClick={() => navigate("/login")}>Inicia sesión aquí</span></p>
    </div>
  );
};

export default Register;
