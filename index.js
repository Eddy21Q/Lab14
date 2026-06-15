import "dotenv/config";
import express from "express";
import { create } from "./routes/albumes/create.js";
import { getAll } from "./routes/albumes/getAll.js";
import { getByGenero } from "./routes/albumes/getByGenero.js";
import { getBySlug } from "./routes/albumes/getBySlug.js";
import { remove } from "./routes/albumes/remove.js";
import { search } from "./routes/albumes/search.js";
import { update } from "./routes/albumes/update.js";

const app = express();

app.enable("strict routing");
app.use(express.json());

const HOST = process.env.HOST ?? "localhost";
const PORT = Number(process.env.PORT ?? 4321);

app.get("/", (req, res) => {
  res.json({
    nombre: "DiscoStore API",
    descripcion: "Catalogo de albumes de una tienda de musica.",
    rutas: [
      "GET /",
      "GET /albumes",
      "GET /album/:slug",
      "GET /genero/:genero",
      "GET /search/:text",
      "POST /albumes",
      "PUT /album/:slug",
      "DELETE /album/:slug",
      "GET /imagenes/*"
    ]
  });
});

app.get("/albumes", getAll);
app.get("/album/:slug", getBySlug);
app.get("/genero/:genero", getByGenero);
app.get("/search/:text", search);
app.post("/albumes", create);
app.put("/album/:slug", update);
app.delete("/album/:slug", remove);

app.listen(PORT, HOST, () => {
  console.log(`Server at http://${HOST}:${PORT}/`);
});
