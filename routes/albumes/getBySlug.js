import data from "../../data.json" with { type: "json" };

const notFound = (res, message) => {
  return res.status(404).json({ error: message });
};

export const getBySlug = (req, res) => {
  const album = data.find((item) => item.slug === req.params.slug);

  if (!album) {
    return notFound(res, "Album not found");
  }

  res.json(album);
};
