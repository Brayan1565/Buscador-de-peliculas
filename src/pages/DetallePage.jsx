import { useParams, Link } from "react-router"
import useFetch from "../hooks/useFetch";
import { adaptarPelicula } from "../utils/adaptar";
import Cargando from "../components/Cargando/Cargando";
import MensajeError from "../components/MensajeError/MensajeError"

const API_KEY = import.meta.env.VITE_OMDB_KEY;

function DetallePage() {
    const { id } = useParams();
    
    const { datos, cargando, error } = useFetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
    );

    if (cargando) return <Cargando />;
    if (error) return <MensajeError mensaje={error} />
    if (datos?.Response === "False") return <MensajeError mensaje={datos.Error} />;

    const { Poster } = adaptarPelicula(datos);

    return (
        <div>
            <Link to="/buscar">Volver</Link>
            <h1>{datos.Title} ({datos.Year})</h1>
            <img src={Poster} alt={datos.Title} />
            <p><strong>Género:</strong> {datos.Genre}</p>
            <p><strong>Director:</strong> {datos.Director}</p>
            <p><strong>Calificación</strong> {datos.imdbRating}</p>
            <p>{datos.Plot}</p>
        </div>
    );

}

export default DetallePage;