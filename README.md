# Buscador de películas

Aplicación hecha con React para buscar películas en la API de OMDB, ver sus detalles y guardar favoritas con una nota personal.

**App publicada:** 
[buscador-peliculas-f7631.web.app](https://buscador-peliculas-f7631.web.app)

## Qué hace

- **Inicio:** resumen de tus películas guardadas y sugerencias al azar.
- **Buscar:** búsqueda con retraso (debounce) para no pedir datos en cada tecla.
- **Detalle:** ruta dinámica `/peliculas/:id` con sinopsis, género, director y calificación.
- **Favoritos:** películas guardadas, con opción de editar la nota o eliminarlas.
- Tema claro y oscuro, y los favoritos se guardan en `localStorage`.

## Tecnologías

React, Vite, React Router, Context API, hooks personalizados (`useFetch`, `useDebounce`, `useLocalStorage`) y la API de OMDB.

## Cómo ejecutarlo

1. Instala las dependencias: `npm install`
2. Consigue una clave gratuita en https://www.omdbapi.com/apikey.aspx
3. Copia `.env.example` como `.env.local` y pega tu clave en `VITE_OMDB_KEY`
4. Inicia la app: `npm run dev`

## Estructura

```
src/
  components/   Piezas reutilizables (tarjeta, lista, formulario...)
  context/      Contexto del tema claro/oscuro
  hooks/        useFetch, useDebounce, useLocalStorage
  pages/        Inicio, Buscar, Detalle, Favoritos y 404
  utils/        Adaptador de datos de la API
```

## Autor

Brayan Sierra