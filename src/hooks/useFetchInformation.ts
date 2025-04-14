import { Inventory } from "@/schemas/inventory.schema";
import { getAllHeaderInformation } from "@/services/inventory.service";
import { useEffect, useState } from "react";

export function useFetchInformation() {
  const [isLoading, setIsLoading] = useState(true);
  const [ information, setInformation] = useState<Inventory>()

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        setIsLoading(true);
        const fetch = await getAllHeaderInformation();

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
    };

    fetchInformation();
  }, []);

  return { isLoading, setIsLoading, information };
}
