import apiClient from "@/lib/api/axios.config";
import { InventoryResponseSchema } from "@/schemas/inventory.schema";

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
