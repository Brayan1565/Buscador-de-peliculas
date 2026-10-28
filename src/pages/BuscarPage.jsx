import { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch"
import useDebounce from "../hooks/useDebounce";
import { adaptarPelicula } from "../utils/adaptar";
import Cargando from "../components/Cargando/Cargando";
import MensajeError from "../components/MensajeError/MensajeError";
import ListaPeliculas from "../components/ListaPeliculas/ListaPeliculas";
import FormularioNota from "../components/FormularioNota/FormularioNota";
import Buscador from "../components/Buscador/Buscador";

const API_KEY = import.meta.env.VITE_OMDB_KEY;

function BuscarPage({ guardados, setGuardados }) {
    const [seleccionada, setSeleccionada] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    
    const busquedaRetrasada = useDebounce(busqueda, 600);

    const termino = 
        busquedaRetrasada.trim().length >= 3 ? busquedaRetrasada.trim() : "batman";
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(termino)}`;

    const { datos, cargando, error} = useFetch(url);
    
    const peliculas = useMemo(
        () => (datos?.Search ? datos.Search.map(adaptarPelicula) : []),
        [datos]
    );

    const errorApi = 
        error ||
            (datos?.Response === "False" && datos.Error !== "Movie not found!"
                ? datos.Error
                : null);

    const seleccionar = (pelicula) => {
        const yaGuardada = guardados.some((p) => p.imdbID === pelicula.imdbID);
        if (!yaGuardada) setSeleccionada(pelicula);
    };

    const guardar = (nota) => {
        setGuardados((prev) => [...prev, { ...seleccionada, nota }]);
        setSeleccionada(null);
    };

    const mostrarResultados = () => {    
        if (cargando) return <Cargando />;
        if (errorApi) return <MensajeError mensaje={errorApi} />;
        if (peliculas.length === 0) return <p>Sin resultados</p>;
        return <ListaPeliculas peliculas={peliculas} onGuardar={seleccionar} />;
    };

    return (
        <div>
            <h1>Buscador de películas</h1>

            <Buscador valor={busqueda} onBuscar={setBusqueda} />

            {mostrarResultados()}

            {seleccionada && (
                <FormularioNota
                    titulo={seleccionada.Title}
                    onSubmitNota={guardar}
                    onCancelar={() => setSeleccionada(null)}
                />
            )}
        </div>
    );
}

export default BuscarPage;