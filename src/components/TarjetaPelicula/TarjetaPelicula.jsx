function TarjetaPelicula({Title, Year, Poster}) {
    return (
        <div className="tarjeta">
            <h2>{Title}</h2>
            <p>{Year}</p>
            <img src={Poster} alt={Title}/>
        </div>
    )
}

export default TarjetaPelicula;