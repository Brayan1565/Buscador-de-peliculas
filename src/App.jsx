// Importamos los componentes que vamos a usar
import ListaPeliculas from "./components/ListaPeliculas/ListaPeliculas";

// Datos inventados con la misma forma que devuelve OMDB.
// Más adelante este arreglo vendrá de la API.
const peliculasEjemplo = [
  { imdbID: "1", Title: "Película Uno", Year: "2000", Poster: "https://via.placeholder.com/150" },
  { imdbID: "2", Title: "Película Dos", Year: "2005", Poster: "https://via.placeholder.com/150" },
  { imdbID: "3", Title: "Película Tres", Year: "2010", Poster: "https://via.placeholder.com/150" },
];

function App() {
  return (
    <div>
      <h1>Buscador de películas</h1>
      <ListaPeliculas peliculas={peliculasEjemplo} />
    </div>
  );
}

export default App;