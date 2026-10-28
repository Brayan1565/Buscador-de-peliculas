import { NavLink } from "react-router";
import BotonTema from "../BotonTema/BotonTema";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/buscar">Buscar</NavLink>
            <NavLink to="/favoritos">Favoritos</NavLink>
            <BotonTema />
        </nav>
    );
}

export default Navbar;