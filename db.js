import Database from "better-sqlite3";
import "dotenv/config";

const DB_FILE = process.env.DB_FILE ?? "discostore.sqlite";

export const db = new Database(DB_FILE);

export const crearTablaAlbumes = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS albumes (
      slug TEXT PRIMARY KEY,
      titulo TEXT NOT NULL,
      artista TEXT NOT NULL,
      genero TEXT NOT NULL,
      anio INTEGER NOT NULL,
      sello TEXT NOT NULL,
      pistas INTEGER NOT NULL,
      imagen TEXT NOT NULL,
      resumen TEXT NOT NULL,
      descripcion TEXT NOT NULL
    )
  `);
};
