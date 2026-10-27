import { useState, useEffect } from "react";
import { adaptarPelicula } from "../utils/adaptar";
import Cargando from "../components/Cargando/Cargando";
import MensajeError from "../components/MensajeError/MensajeError";
import ListaPeliculas from "../components/ListaPeliculas/ListaPeliculas";
import FormularioNota from "../components/FormularioNota/FormularioNota";
import Buscador from "../components/Buscador/Buscador";

const API_KEY = import.meta.env.VITE_OMDB_KEY;

function BuscarPage() {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [guardados, setGuardados] = useState([]);
    const [editando, setEditando] = useState(null);
    const [seleccionada, setSeleccionada] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&s=batman`
                );
                if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
                const data = await res.json();
                if (data.Response === "False") throw new Error(data.Error);
                setPeliculas(data.Search.map(adaptarPelicula));
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, []);

    const filtradas = peliculas.filter((p) =>
        p.Title.toLowerCase().includes(busqueda.toLowerCase())
    );

    const seleccionar = (pelicula) => {
        const yaGuardada = guardados.some((p) => p.imdbID === pelicula.imdbID);
        if (!yaGuardada) setSeleccionada(pelicula);
    };

    const guardar = (nota) => {
        setGuardados((prev) => [...prev, { ...seleccionada, nota }]);
        setSeleccionada(null);
    };

    const eliminar = (id) => {
        setGuardados((prev) => prev.filter((p) => p.imdbID !== id));
    };

    const editarNota = (id, nuevaNota) => {
        setGuardados((prev) =>
            prev.map((p) => p.imdbID === id ? { ...p, nota: nuevaNota } : p
            )
        );
    };

    if (cargando) return <Cargando />;
    if (error) return <MensajeError mensaje={error} />;

    return (
        <div>
            <h1>Buscador de películas</h1>

            <Buscador valor={busqueda} onBuscar={setBusqueda} />

            {filtradas.length === 0 ? (
                <p>Sin resultados.</p>
            ) : (
                <ListaPeliculas peliculas={filtradas} onGuardar={seleccionar} />
            )}

            {seleccionada && (
                <FormularioNota
                    titulo={seleccionada.Title}
                    onSubmitNota={guardar}
                    onCancelar={() => setSeleccionada(null)}
                />
            )}

            {editando && (
                <FormularioNota
                    key={editando.imdbID}
                    titulo={editando.Title}
                    notaInicial={editando.nota}
                    onSubmitNota={(nuevaNota) => {
                        editarNota(editando.imdbID, nuevaNota);
                        setEditando(null);
                    }}
                    onCancelar={() => setEditando(null)}
                />
            )}

            <h2>Mis guardados</h2>
            {guardados.length === 0 ? (
                <p>Aún no has guardado películas.</p>
            ) : (
                <ListaPeliculas
                    peliculas={guardados}
                    onEliminar={eliminar}
                    onEditar={setEditando}
                />
            )}
        </div>
    );
}

export default BuscarPage;