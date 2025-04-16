import { Inventory } from "@/schemas/inventory.schema";
import { getAllHeaderInformation } from "@/services/inventory.service";
import { useCallback, useEffect, useState } from "react";

export function useFetchInformation() {
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [information, setInformation] = useState<Inventory>(); // Estado para almacenar la información del inventario

  const fetchInformation = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetch = await getAllHeaderInformation(); // Llama al servicio para obtener la información del inventario

      if (fetch?.code === 200) {
        setInformation(fetch.datos);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInformation();
  }, [fetchInformation]);

  return { isLoading, setIsLoading, information, fetchInformation };
}
