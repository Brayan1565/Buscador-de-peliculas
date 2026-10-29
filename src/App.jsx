import { useContext } from "react";
import { TemaContext } from "./context/TemaContext";
import { Routes, Route } from "react-router";
import useLocalStorage from "./hooks/useLocalStorage";
import Navbar from "./components/Navbar/Navbar";
import InicioPage from "./pages/InicioPage";
import BuscarPage from "./pages/BuscarPage";
import DetallePage from "./pages/DetallePage";
import FavoritosPage from "./pages/FavoritoPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [guardados, setGuardados] = useLocalStorage("guardados", []);

  const { tema } = useContext(TemaContext);

  return (
    <div className={`app ${tema}`}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<InicioPage guardados={guardados} setGuardados={setGuardados} />}
        />
        <Route
          path="/buscar"
          element={<BuscarPage guardados={guardados} setGuardados={setGuardados} />}
        />
        <Route
          path="/peliculas/:id"
          element={<DetallePage guardados={guardados} setGuardados={setGuardados} />}
        />
        <Route
          path="/favoritos"
          element={<FavoritosPage guardados={guardados} setGuardados={setGuardados} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;