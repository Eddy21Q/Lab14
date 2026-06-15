import data from "../../data.json" with { type: "json" };

export const getAll = (req, res) => {
  res.header("Content-type", "application/json");
  res.send(data.map((album) => album.slug));
};
