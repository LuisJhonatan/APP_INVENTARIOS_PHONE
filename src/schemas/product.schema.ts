import { z } from "zod";

/**
 * Esquema de validación para un producto.
 *
 * @typedef Product
 * @property {string} nombre - Nombre del producto.
 * @property {string} descripcion - Descripción del producto.
 * @property {number} stock - Cantidad de stock disponible.
 * @property {string} precio_venta - Precio de venta del producto.
 */
export const ProductSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  stock: z.number(),
  precio_venta: z.string(),
});

/**
 * Esquema de respuesta para operaciones relacionadas con productos.
 *
 * @typedef ProductResponse
 * @property {number} code - Código de respuesta.
 * @property {string} message - Mensaje descriptivo de la respuesta.
 * @property {Product[]} productos - Lista de productos.
 * @property {string} status - Estado de la respuesta.
 */
export const ProductResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  productos: z.array(ProductSchema),
  status: z.string(),
});

/**
 * Esquema de validación para la búsqueda de productos por palabra clave.
 *
 * @typedef SearchByWord
 * @property {string} search - Palabra clave para realizar la búsqueda.
 * Debe tener al menos 1 carácter y no exceder los 100 caracteres.
 */
export const SearchByWordSchema = z.object({
  search: z
    .string()
    .min(1, { message: "El campo de búsqueda no puede estar vacío" })
    .max(100, "El campo de búsqueda no puede exceder los 100 caracteres"),
});

export type SearchByWord = z.infer<typeof SearchByWordSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
