import { z } from "zod";

export const crearSlug = (titulo) => {
  return titulo
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

export const albumSchema = z
  .object({
    titulo: z.string().trim().min(1),
    artista: z.string().trim().min(1),
    genero: z.string().trim().min(1),
    anio: z.number().int().min(1900).max(2100),
    sello: z.string().trim().min(1),
    pistas: z.number().int().positive(),
    imagen: z.string().trim().min(1),
    slug: z.string().trim().min(1).optional(),
    resumen: z.string().trim().min(1),
    descripcion: z.string().trim().min(1)
  })
  .transform((album) => ({
    ...album,
    slug: album.slug ? crearSlug(album.slug) : crearSlug(album.titulo)
  }));
