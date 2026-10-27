function Buscador({ valor, onBuscar }) {
    return (
        <input
            type="search"
            value={valor}
            onChange={(evento) => onBuscar(evento.target.value)}
            placeholder="Buscar pelicula..."
        />
    );
}

export default Buscador;