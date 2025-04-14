import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Product,
  SearchByWord,
  SearchByWordSchema,
} from "@/schemas/product.schema";
import { searchProductByWord } from "@/services/product.service";

export function useSearchProductForm({
  setIsLoading,
  setCellPhones,
}: {
  setIsLoading: (isLoading: boolean) => void;
    setCellPhones: (cellPhones: Product[]) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchByWord>({
    resolver: zodResolver(SearchByWordSchema),
  }); //useForm para manejar el formulario de búsqueda


  //función para manejar el envío del formulario de búsqueda
  const onSubmit = async (data: SearchByWord) => {
    try {
      setIsLoading(true);
      setCellPhones([]);
      const fetch = await searchProductByWord(data.search); //llama al servicio de búsqueda de productos

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

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
