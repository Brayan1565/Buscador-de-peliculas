import { useParams, Link, useNavigate, useLocation } from "react-router"
import useFetch from "../hooks/useFetch";
import { adaptarPelicula } from "../utils/adaptar";
import Cargando from "../components/Cargando/Cargando";
import MensajeError from "../components/MensajeError/MensajeError"

const API_KEY = import.meta.env.VITE_OMDB_KEY;


function DetallePage({ guardados, setGuardados }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const volver = (e) => {
        e.preventDefault();
        if (location.key !== "default") navigate(-1);
        else navigate("/buscar");
    };

    const { datos, cargando, error } = useFetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
    );

    if (cargando) return <Cargando />;
    if (error) return <MensajeError mensaje={error} />
    if (datos?.Response === "False") return <MensajeError mensaje={datos.Error} />;


    const pelicula = adaptarPelicula(datos);


    const yaGuardada = guardados.some((p) => p.imdbID === pelicula.imdbID);

    const guardar = () => {
        setGuardados((prev) =>
            prev.some((p) => p.imdbID === pelicula.imdbID)
                ? prev
                : [...prev, { ...pelicula, nota: "" }]
        );
    };

    return (
        <div className="detalle">
            <Link to="/buscar" onClick={volver}>Volver</Link>
            <h1>{datos.Title} ({datos.Year})</h1>
            <img src={pelicula.Poster} alt={datos.Title} onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/sin-poster.jpg";
            }}
            />
            <p><strong>Género:</strong> {datos.Genre}</p>
            <p><strong>Director:</strong> {datos.Director}</p>
            <p><strong>Calificación:</strong> {datos.imdbRating}</p>
            <p>{datos.Plot}</p>

            <button onClick={guardar} disabled={yaGuardada}>
                {yaGuardada ? "Guardada ✓" : "Guardar"}
            </button>
        </div>
    );
}

export default DetallePage;