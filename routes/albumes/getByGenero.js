import data from "../../data.json" with { type: "json" };

export const getByGenero = (req, res) => {
  const genero = req.params.genero.toLowerCase();

  const albumes = data
    .filter((album) => album.genero.toLowerCase() === genero)
    .map((album) => album.slug);

  res.json(albumes);
};
