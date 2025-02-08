import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // ⬅️ IMPORTACIÓN CORRECTA
import Header from "./components/Header"; // ⬅️ IMPORTACIÓN CORRECTA
import Movies from "./pages/Movies"; 
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MoviesByCategory from "./pages/MoviesByCategory";
import SeriesByCategory from "./pages/SeriesByCategory";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/category/:id" element={<MoviesByCategory />} />
        <Route path="/series/category/:id" element={<SeriesByCategory />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
