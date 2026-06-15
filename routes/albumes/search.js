import data from "../../data.json" with { type: "json" };
import { searchSchema } from "./search.schema.js";

export const search = (req, res) => {
  const parsed = searchSchema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid search text" });
  }

  const query = parsed.data.text;

  const results = data
    .filter((album) => {
      const json = JSON.stringify(album).toLowerCase();
      return json.includes(query);
    })
    .map((album) => album.slug);

  res.json(results);
};
