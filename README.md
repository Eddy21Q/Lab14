# DiscoStore

API para administrar el catalogo de albumes de una tienda de musica. Los datos iniciales estan en `data.json` y se cargan de forma obligatoria en SQLite con el script de semilla. Despues de esa carga, las operaciones de escritura modifican la base de datos.

## Requisitos

- Node.js
- npm

## Instalacion

```bash
npm install
```

## Variables de entorno

Cree un archivo `.env` tomando como base `.env.example`:

```env
HOST=localhost
PORT=4321
DB_FILE=discostore.sqlite
```

## Poblar la base de datos

```bash
npm run seed
```

Este comando crea la tabla `albumes` en SQLite y carga los 6 albumes de `data.json`.

## Ejecutar

```bash
npm run dev
```

O sin nodemon:

```bash
npm start
```

La API queda disponible en:

```txt
http://localhost:4321/
```

## Rutas

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/` | Informacion de la API |
| GET | `/albumes` | Lista de slugs |
| GET | `/album/:slug` | Datos de un album |
| GET | `/genero/:genero` | Slugs de albumes por genero |
| GET | `/search/:text` | Busqueda por texto |
| POST | `/albumes` | Crea un album |
| PUT | `/album/:slug` | Actualiza un album |
| DELETE | `/album/:slug` | Elimina un album |
| GET | `/imagenes/*` | Sirve portadas desde `covers/` |

## Codigos HTTP

| Codigo | Uso |
| --- | --- |
| 200 | Lectura exitosa o actualizacion exitosa |
| 201 | Album creado. Incluye cabecera `Location` |
| 204 | Album eliminado. Sin cuerpo |
| 400 | Validacion con Zod fallida |
| 404 | Album no encontrado |
| 409 | Ya existe un album con ese slug |

## Ejemplos

Crear un album:

```bash
curl -i -X POST http://localhost:4321/albumes \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Discovery\",\"artista\":\"Daft Punk\",\"genero\":\"electronica\",\"anio\":2001,\"sello\":\"Virgin\",\"pistas\":14,\"imagen\":\"discovery.jpg\",\"resumen\":\"Album electronico con sonido disco y house.\",\"descripcion\":\"Segundo album de Daft Punk con canciones populares.\"}"
```

Actualizar un album:

```bash
curl -i -X PUT http://localhost:4321/album/thriller \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Thriller 25\",\"artista\":\"Michael Jackson\",\"genero\":\"pop\",\"anio\":2008,\"sello\":\"Epic\",\"pistas\":16,\"imagen\":\"thriller.jpg\",\"resumen\":\"Reedicion del album Thriller.\",\"descripcion\":\"Version conmemorativa del album Thriller con material adicional.\"}"
```

Eliminar un album:

```bash
curl -i -X DELETE http://localhost:4321/album/thriller
```
