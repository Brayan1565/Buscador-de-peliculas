import { useContext } from "react";
import { TemaContext } from "../../context/TemaContext";

function BotonTema() {
    const { tema, alternar } = useContext(TemaContext);

    return (
        <button onClick={alternar}>
            {tema === "claro" ? "Modo oscuro" : "Modo claro"}
        </button>
    )
}

export default BotonTema;