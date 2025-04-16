import apiClient from "@/lib/api/axios.config";
import {
  AddProductParse,
  AddProductResponseSchema,
  ProductResponseSchema,
} from "@/schemas/product.schema";

/**
 * Busca un producto por palabra clave utilizando una solicitud POST al endpoint correspondiente.
 *
 * @param search - La palabra clave que se utilizará para buscar el producto.
 * @returns Una promesa que resuelve con los datos del producto parseados según el esquema `ProductResponseSchema`.
 * @throws Registra un mensaje de error en la consola si ocurre un error durante la solicitud o el procesamiento de datos.
 */
export async function searchProductByWord(search: string = "") {
  try {
    const response = await apiClient.post("/productos/listarproductos", {
      nombre_producto: search,
    });

    const responseParse = ProductResponseSchema.parse(response.data);

    return responseParse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred", error);
    }
  }
}

/**
 * Agrega un nuevo producto utilizando una solicitud POST al endpoint correspondiente.
 *
 * @param data - Los datos del producto que se agregarán, parseados según el esquema `AddProductParse`.
 * @returns Una promesa que resuelve con la respuesta del servidor parseada según el esquema `AddProductResponseSchema`.
 * @throws Registra un mensaje de error en la consola si ocurre un error durante la solicitud o el procesamiento de datos.
 */
export async function addProduct(data: AddProductParse) {
  try {
    const response = await apiClient.post("/productos/insertarProducto", data);
    const responseParse = AddProductResponseSchema.parse(response.data);
    console.log(response);

    return responseParse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred", error);
    }
  }
}
