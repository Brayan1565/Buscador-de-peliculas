export function adaptarPelicula(item) {
    return {
        imdbID: item.imdbID,
        Title: item.Title,
        Year: item.Year,
        Poster: item.Poster === "N/A" ? "/sin-poster.jpg" : item.Poster,
    };
}