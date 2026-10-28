import { TemaContext } from "./TemaContext";
import useLocalStorage from "../hooks/useLocalStorage";

function TemaProvider({ children }) {
    const [tema, setTema] = useLocalStorage("tema", "claro");

    const alternar = () =>
        setTema((t) => (t === "claro" ? "oscuro" : "claro"));

    return (
        <TemaContext.Provider value={{ tema, alternar }}>
            {children}
        </TemaContext.Provider>
    );
}

export default TemaProvider;