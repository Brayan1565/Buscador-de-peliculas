import { useState, useEffect } from "react";

function useFetch(url) {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(Boolean(url));
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) retun;
        let cancelado = false;
        const cargar = async () => {
            setCargando(true);
            setError(null);
            try{
                const res = await fetch(url);
                if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
                const json = await res.json();
                if (!cancelado) setDatos(json);
            } catch (err) {
                if (!cancelado) setDatos(err.message);
            } finally {
                if (!cancelado) setCargando(false);
            }
        };
        cargar();

        return () => {
            cancelado = true;
        };
    }, [url]);

    return { datos, cargando, error };
}

export default useFetch;