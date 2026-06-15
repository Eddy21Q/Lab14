import data from "./data.json" with { type: "json" };
import { crearTablaAlbumes, db } from "./db.js";

crearTablaAlbumes();

db.prepare("DELETE FROM albumes").run();

const insertarAlbum = db.prepare(`
  INSERT INTO albumes (
    slug, titulo, artista, genero, anio, sello, pistas, imagen, resumen, descripcion
  )
  VALUES (
    @slug, @titulo, @artista, @genero, @anio, @sello, @pistas, @imagen, @resumen, @descripcion
  )
`);

const cargarAlbumes = db.transaction((albumes) => {
  for (const album of albumes) {
    insertarAlbum.run(album);
  }
});

cargarAlbumes(data);

console.log(`Se cargaron ${data.length} albumes en SQLite.`);
