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

const albumBaseSchema = z.object({
  titulo: z.string().trim().min(1),
  artista: z.string().trim().min(1),
  genero: z.string().trim().min(1),
  anio: z.number().int().min(1900).max(2100),
  sello: z.string().trim().min(1),
  pistas: z.number().int().positive(),
  imagen: z.string().trim().min(1),
  resumen: z.string().trim().min(1),
  descripcion: z.string().trim().min(1)
});

export const albumSchema = albumBaseSchema
  .extend({
    slug: z.string().trim().min(1).optional()
  })
  .transform((album) => ({
    ...album,
    slug: crearSlug(album.titulo)
  }));

export const albumUpdateSchema = albumBaseSchema
  .extend({
    slug: z.string().trim().min(1)
  })
  .transform((album) => ({
    ...album,
    slug: crearSlug(album.slug)
  }));
