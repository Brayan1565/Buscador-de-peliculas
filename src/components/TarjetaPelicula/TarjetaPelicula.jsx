function TarjetaPelicula({ pelicula, onGuardar, onEliminar, onEditar }) {
    return (
        <div className="tarjeta">

            <h2>{pelicula.Title}</h2>
            <p>{pelicula.Year}</p>
            <img src={pelicula.Poster} alt={pelicula.Title} />


            {pelicula.nota && <p>Nota: {pelicula.nota}</p>}
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
    );
}

export default TarjetaPelicula;