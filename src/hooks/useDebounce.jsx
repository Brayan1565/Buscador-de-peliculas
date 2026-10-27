import {useState, useEffect } from "react";

function useDebounce(valor, retraso = 500) {
    const [valorRetrasado, setValorRetrasado] = useState(valor);

    useEffect(() => {
        const id = setTimeout(() => setValorRetrasado(valor), retraso);

        return () => clearTimeout(id);
    }, [valor, retraso]);

    return valorRetrasado;
}

export default useDebounce;