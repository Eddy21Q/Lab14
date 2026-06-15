import { db } from "../../db.js";

export const remove = (req, res) => {
  const exists = db
    .prepare("SELECT slug FROM albumes WHERE slug = ?")
    .get(req.params.slug);

  if (!exists) {
    return res.status(404).json({ error: "Album not found" });
  }

  db.prepare("DELETE FROM albumes WHERE slug = ?").run(req.params.slug);

  res.status(204).send();
};
