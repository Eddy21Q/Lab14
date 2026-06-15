import { db } from "../../db.js";

export const getByGenero = (req, res) => {
  const genero = req.params.genero.toLowerCase();

  const albumes = db
    .prepare("SELECT slug FROM albumes WHERE lower(genero) = ? ORDER BY titulo")
    .all(genero)
    .map((album) => album.slug);

  res.json(albumes);
};
