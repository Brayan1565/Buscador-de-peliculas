import TarjetaPelicula from "../TarjetaPelicula/TarjetaPelicula";

function ListaPeliculas({ peliculas }) {
    return (
        <>
            <div className="Peliculas">
                {peliculas.map((pelicula) => (
                    <TarjetaPelicula
                        key={pelicula.imdbID}
                        Title={pelicula.Title}
                        Year={pelicula.Year}
                        Poster={pelicula.Poster}
                    />
                ))}
            </div>
        </>
    )
}

export default ListaPeliculas;