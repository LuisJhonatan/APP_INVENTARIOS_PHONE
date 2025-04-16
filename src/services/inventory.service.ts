import apiClient from "@/lib/api/axios.config";
import { InventoryResponseSchema } from "@/schemas/inventory.schema";

/**
 * Obtiene toda la información del encabezado del inventario utilizando una solicitud GET al endpoint correspondiente.
 *
 * @returns Una promesa que resuelve con la información del inventario parseada según el esquema `InventoryResponseSchema`.
 * @throws Registra un mensaje de error en la consola si ocurre un error durante la solicitud o el procesamiento de datos.
 */
export async function getAllHeaderInformation() {
  try {
    const response = await apiClient.get("inventario/reporteCabecera");
    const responseParse = InventoryResponseSchema.parse(response.data);
    return responseParse;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred", error);
    }
  }
}
