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

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route
          path="/buscar"
          element={<BuscarPage guardados={guardados} setGuardados={setGuardados} />}
        />
        <Route path="/peliculas/:id" element={<DetallePage />} />
        <Route 
        path="/favoritos"
        element={<FavoritosPage guardados={guardados} setGuardados={setGuardados} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;