import "dotenv/config";
import express from "express";

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

app.listen(PORT, HOST, () => {
  console.log(`Server at http://${HOST}:${PORT}/`);
});
