import { useState, useMemo } from "react";
import { Link } from "react-router";
import useFetch from "../hooks/useFetch";
import { adaptarPelicula } from "../utils/adaptar";
import Cargando from "../components/Cargando/Cargando";
import MensajeError from "../components/MensajeError/MensajeError";
import ListaPeliculas from "../components/ListaPeliculas/ListaPeliculas";

const API_KEY = import.meta.env.VITE_OMDB_KEY;

const SUGERENCIAS = [
    "star wars",
    "matrix",
    "harry potter",
    "avengers",
    "jurassic",
    "toy story",
    "lord of the rings",
    "spider-man",
];

function InicioPage({ guardados, setGuardados }) {
    const [sugerencia] = useState(
        () => SUGERENCIAS[Math.floor(Math.random() * SUGERENCIAS.length)]
    );


    const { datos, cargando, error } = useFetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(sugerencia)}`
    );


    const peliculas = useMemo(
        () =>
            datos?.Search ? datos.Search.slice(0, 8).map(adaptarPelicula) : [],
        [datos]
    );


    const conNota = guardados.filter((p) => p.nota).length;
    const recientes = guardados.slice(-6).reverse();

    const guardar = (pelicula) => {
        setGuardados((prev) =>
            // some() es true si ya existe una con ese id: así no se duplica
            prev.some((p) => p.imdbID === pelicula.imdbID)
                ? prev
                : [...prev, { ...pelicula, nota: "" }]
        );
    };

    return (
        <div className="inicio">
            <section className="hero">
                <h1>Buscador de películas</h1>
                <p>
                    Busca cualquier película, mira sus detalles y guarda tus
                    favoritas con una nota personal.
                </p>
                <Link className="boton-principal" to="/buscar">
                    Empezar a buscar
                </Link>
            </section>

            <section className="stats">
                <div>
                    <strong>{guardados.length}</strong>
                    <span>guardadas</span>
                </div>
                <div>
                    <strong>{conNota}</strong>
                    <span>con nota</span>
                </div>
            </section>

            <section>
                <h2>Tus guardadas recientes</h2>
                {recientes.length === 0 ? (
                    <p className="vacio">
                        Aún no has guardado películas.{" "}
                        <Link to="/buscar">Busca la primera</Link>
                    </p>
                ) : (
                    <ListaPeliculas peliculas={recientes} />
                )}
            </section>

            <section>
                <h2>Sugerencias: {sugerencia}</h2>
                {cargando && <Cargando />}
                {error && <MensajeError mensaje={error} />}
                {!cargando && !error && (
                    <ListaPeliculas peliculas={peliculas} onGuardar={guardar} />
                )}
            </section>
        </div>
    );
}

export default InicioPage;