import { db } from "../../db.js";
import { albumSchema } from "./album.schema.js";

export const create = (req, res) => {
  const parsed = albumSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid album data" });
  }

  const album = parsed.data;

  const exists = db
    .prepare("SELECT slug FROM albumes WHERE slug = ?")
    .get(album.slug);

  if (exists) {
    return res.status(409).json({ error: "Album already exists" });
  }

  db.prepare(`
    INSERT INTO albumes (
      slug, titulo, artista, genero, anio, sello, pistas, imagen, resumen, descripcion
    )
    VALUES (
      @slug, @titulo, @artista, @genero, @anio, @sello, @pistas, @imagen, @resumen, @descripcion
    )
  `).run(album);

  res.location(`/album/${album.slug}`);
  res.status(201).json(album);
};
