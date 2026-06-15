import { db } from "../../db.js";
import { searchSchema } from "./search.schema.js";

export const search = (req, res) => {
  const parsed = searchSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid search text" });
  }

  const query = `%${parsed.data.text}%`;

  const results = db
    .prepare(`
      SELECT slug
      FROM albumes
      WHERE lower(titulo) LIKE ?
        OR lower(artista) LIKE ?
        OR lower(genero) LIKE ?
        OR lower(sello) LIKE ?
        OR lower(resumen) LIKE ?
        OR lower(descripcion) LIKE ?
      ORDER BY titulo
    `)
    .all(query, query, query, query, query, query)
    .map((album) => album.slug);

  res.json(results);
};
