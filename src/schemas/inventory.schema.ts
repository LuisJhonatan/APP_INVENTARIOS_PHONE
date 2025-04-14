import {z} from "zod";

export const InventorySchema = z.object({
    marcas_disponibles : z.number(),
    productos_agotados : z.number(),
    total_productos : z.number(),
    ventas_mes : z.string(),
})

export const InventoryResponseSchema = z.object({
    code: z.number(),
    datos : InventorySchema,
    message : z.string(),
    status : z.string(),
})

export type Inventory = z.infer<typeof InventorySchema>;
