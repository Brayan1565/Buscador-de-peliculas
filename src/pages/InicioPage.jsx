import { useContext } from "react";
import { TemaContext } from "../context/TemaContext";
import { Link } from "react-router";

function InicioPage() {
    const { tema } = useContext(TemaContext)
    return (
        <div>
            <h1>Buscador de películas</h1>
            <p>Busca cualquier pelicula y guarda tus favoritos con una nota.</p>
            <p>Estas en modo {tema}.</p>
            <Link to="/buscar">Empezar a buscar</Link>
        </div>
    );
}

export default InicioPage;
