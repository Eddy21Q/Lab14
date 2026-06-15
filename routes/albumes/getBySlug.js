import { db } from "../../db.js";

const notFound = (res, message) => {
  return res.status(404).json({ error: message });
};

export const getBySlug = (req, res) => {
  const album = db
    .prepare("SELECT * FROM albumes WHERE slug = ?")
    .get(req.params.slug);

  if (!album) {
    return notFound(res, "Album not found");
  }

  res.json(album);
};
