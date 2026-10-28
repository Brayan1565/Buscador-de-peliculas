import { NavLink } from "react-router";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/buscar">Buscar</NavLink>
            <NavLink to="/favoritos">Favoritos</NavLink>
        </nav>
    );
}

export default Navbar;