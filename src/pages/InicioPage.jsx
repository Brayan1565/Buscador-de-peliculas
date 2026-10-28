import { Link } from "react-router";

function InicioPage() {
    return (
        <div>
            <h1>Buscador de películas</h1>
            <p>Busca cualquier pelicula y guarda tus favoritos con una nota.</p>
            <Link to="/buscar">Empezar a buscar</Link>
        </div>
    );
}

export default InicioPage;
