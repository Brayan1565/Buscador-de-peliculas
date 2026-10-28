import { useState } from "react";
import ListaPeliculas from "../components/ListaPeliculas/ListaPeliculas";
import FormularioNota from "../components/FormularioNota/FormularioNota";

function FavoritosPage({ guardados, setGuardados }) {
    const [editando, setEditando] = useState(null);

    const eliminar = (id) => {
        setGuardados((prev) => prev.filter((p) => p.imdbID !== id));
    };

    const editarNota = (id, nuevaNota) => {
        setGuardados((prev) =>
            prev.map((p) => (p.imdbID === id ? { ...p, nota: nuevaNota } : p))
        );
    };

    return (
        <div>
            <h1>Mis guardados</h1>

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

export default FavoritosPage;