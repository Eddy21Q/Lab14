import { db } from "../../db.js";
import { albumUpdateSchema } from "./album.schema.js";

export const update = (req, res) => {
  const exists = db
    .prepare("SELECT slug FROM albumes WHERE slug = ?")
    .get(req.params.slug);

  if (!exists) {
    return res.status(404).json({ error: "Album not found" });
  }

  const parsed = albumUpdateSchema.safeParse({
    ...req.body,
    slug: req.params.slug
  });

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid album data" });
  }

  const album = parsed.data;

  db.prepare(`
    UPDATE albumes
    SET titulo = @titulo,
        artista = @artista,
        genero = @genero,
        anio = @anio,
        sello = @sello,
        pistas = @pistas,
        imagen = @imagen,
        resumen = @resumen,
        descripcion = @descripcion
    WHERE slug = @slug
  `).run(album);

  res.json(album);
};
