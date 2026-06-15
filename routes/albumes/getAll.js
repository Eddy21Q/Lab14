import { db } from "../../db.js";

export const getAll = (req, res) => {
  const albumes = db
    .prepare("SELECT slug FROM albumes ORDER BY titulo")
    .all()
    .map((album) => album.slug);

  res.header("Content-type", "application/json");
  res.send(albumes);
};
