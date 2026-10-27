import { useState } from "react";
import ListaPeliculas from "../components/ListaPeliculas/ListaPeliculas";
import FormularioNota from "../components/FormularioNota/FormularioNota";
import Buscador from "../components/Buscador/Buscador";

const peliculasEjemplo = [
    { imdbID: "1", Title: "Película Uno", Year: "2000", Poster: "/rocky.jpg" },
    { imdbID: "2", Title: "Película Dos", Year: "2005", Poster: "/rocky.jpg" },
    { imdbID: "3", Title: "Película Tres", Year: "2010", Poster: "/rocky.jpg" },
];

function BuscarPage() {
    const [peliculas] = useState(peliculasEjemplo);
    const [guardados, setGuardados] = useState([]);
    const [editando, setEditando] = useState(null);
    const [seleccionada, setSeleccionada] = useState(null);
    const [busqueda, setBusqueda] = useState("");

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