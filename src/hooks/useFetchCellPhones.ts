import { Product } from "@/schemas/product.schema";
import { searchProductByWord } from "@/services/product.service";
import { useEffect, useState } from "react";

export function useFetchCellPhones(selectedBrand: number) {
  const [isLoading, setIsLoading] = useState(true); //maneja el estado de carga de los productos
  const [cellPhones, setCellPhones] = useState<Product[]>([]); //maneja el estado de los productos encontrados
  const [filteredCellPhones, setFilteredCellPhones] = useState<Product[]>([]); //maneja el estado de los productos filtrados por marca

  // Llama al servicio para buscar productos al cargar la página
  useEffect(() => {
    const fetchCellPhones = async () => {
      try {
        setIsLoading(true);
        setCellPhones([]);
        const fetch = await searchProductByWord(); //llama al servicio de búsqueda de productos

        if (fetch?.code === 200) {
          //verifica si la búsqueda fue exitosa
          setCellPhones(fetch.productos);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchCellPhones(); //llama a la función de búsqueda de productos
  }, []);

  // Filtra los productos por marca seleccionada cada vez que cambia la marca seleccionada o los productos
  useEffect(() => {
    const filtered = cellPhones.filter(
      (phone) => phone.id_marca === selectedBrand
    );
    setFilteredCellPhones(filtered);
  }, [selectedBrand, cellPhones]);

  return {
    isLoading,
    setIsLoading,
    cellPhones,
    setCellPhones,
    filteredCellPhones,
  };
}
