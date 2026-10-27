import TarjetaPelicula from "../TarjetaPelicula/TarjetaPelicula";

function ListaPeliculas({ peliculas, onGuardar, onEliminar, onEditar }) {
    return (
        <div className="peliculas">
            {peliculas.map((pelicula) => (
                <TarjetaPelicula
                    key={pelicula.imdbID}
                    pelicula={pelicula}
                    onGuardar={onGuardar}
                    onEliminar={onEliminar}
                    onEditar={onEditar}
                />
            ))}
        </div>
    );
}

export default ListaPeliculas;