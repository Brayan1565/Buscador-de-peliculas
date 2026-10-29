import { useState } from "react";

function FormularioNota({ titulo, notaInicial = "", onSubmitNota, onCancelar }) {
    const [nota, setNota] = useState(notaInicial);

    const manejarSubmit = (evento) => {
        evento.preventDefault();
        onSubmitNota(nota);
        setNota("");
    };

    return (
        <form onSubmit={manejarSubmit}>
            <p>Nota para: {titulo}</p>

            <input
                autoFocus
                value={nota}
                onChange={(evento) => setNota(evento.target.value)}
                placeholder="Escribe tu nota"

            />

            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancelar}>Cancelar</button>
        </form>
    );
}

export default FormularioNota;