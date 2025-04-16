import { z } from "zod";

export const MarkProductSchema = z.object({
  id: z.number(),
  name: z.string(),
});

/*
 * Esquema de validación para un producto.
 */
export const ProductSchema = z
  .object({
    nombre: z.string(),
    precio_venta: z.string(),
    stock: z.number(),
    descripcion: z.string(),
    id_producto: z.number(),
    id_marca: z.number(),
    orden: z.number(),
  })
  .strict();

/*
 * Esquema de respuesta para operaciones relacionadas con productos.
 */
export const ProductResponseSchema = z
  .object({
    code: z.number(),
    message: z.string(),
    productos: z.array(ProductSchema),
    status: z.string(),
  })
  .strict();

/**
 * Esquema de validación para agregar un producto.
 */
export const AddProductSchema = z
  .object({
    nombre_producto: z
      .string()
      .min(1, "El nombre es obligatorio")
      .max(100, "El nombre no puede exceder los 100 caracteres"),
    descripcion: z
      .string()
      .max(500, "La descripción no puede exceder los 500 caracteres")
      .optional(),
    id_marca: z.string().regex(/^\d+$/, "Debe ser un número válido"),
    precio_compra: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Debe ser un número válido")
      .optional(),
    precio_venta: z.string().regex(/^\d+$/, "Debe ser un número válido"),
    stock: z.string().regex(/^\d+$/, "Debe ser un número válido").optional(),
    id_tipo_producto: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Debe ser un número válido"),
  })
  .strict();
/**
 * Esquema de validación para agregar un producto con conversión de números.
 *
 * Este esquema convierte automáticamente los campos numéricos de cadenas a números.
 */
export const AddProductParseSchema = AddProductSchema.extend({
  id_marca: z.preprocess((val) => Number(val), z.number().int()),
  precio_compra: z.preprocess(
    (val) => (val !== undefined ? Number(val) : undefined),
    z.number().optional()
  ),
  precio_venta: z.preprocess((val) => Number(val), z.number()),
  stock: z.preprocess(
    (val) => (val !== undefined ? Number(val) : undefined),
    z.number().optional()
  ),
  id_tipo_producto: z.preprocess((val) => Number(val), z.number()),
});

/**
 * Esquema de respuesta para agregar un producto.
 */

export const AddProductResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  status: z.string(),
});

/*
 * Esquema de validación para la búsqueda de productos por palabra clave.
 */
export const SearchByWordSchema = z.object({
  search: z
    .string()
    .max(100, "El campo de búsqueda no puede exceder los 100 caracteres"),
});

export type MarkProduct = z.infer<typeof MarkProductSchema>;
export type SearchByWord = z.infer<typeof SearchByWordSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type AddProduct = z.infer<typeof AddProductSchema>;
export type AddProductParse = z.infer<typeof AddProductParseSchema>;
