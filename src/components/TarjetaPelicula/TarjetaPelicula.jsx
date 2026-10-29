import { Link } from "react-router";

function TarjetaPelicula({ pelicula, onGuardar, onEliminar, onEditar }) {
    return (
        <div className="tarjeta">
            <h2>{pelicula.Title}</h2>
            <p>{pelicula.Year}</p>
            <img src={pelicula.Poster} alt={pelicula.Title} onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/sin-poster.jpg"
            }}
            />

            {pelicula.nota && <p>Nota: {pelicula.nota}</p>}

            <div className="acciones">
                <Link to={`/peliculas/${pelicula.imdbID}`}>Ver detalle</Link>

                {onGuardar && (
                    <button onClick={() => onGuardar(pelicula)}>Guardar</button>
                )}
                {onEliminar && (
                    <button onClick={() => onEliminar(pelicula.imdbID)}>Eliminar</button>
                )}
                {onEditar && (
                    <button onClick={() => onEditar(pelicula)}>Editar nota</button>
                )}
            </div>
        </div>
    );
}

export default TarjetaPelicula;