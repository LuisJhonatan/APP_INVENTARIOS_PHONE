import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchProductForm } from "@/hooks/useSearchProductForm ";
import { Product } from "@/schemas/product.schema";
import { Search } from "lucide-react";

export default function SearchProductForm({
  setCellPhones,
  setIsLoading,
}: {
  setCellPhones: (cellPhones: Product[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}) {
  const { register, handleSubmit, errors, onSubmit } =
    useSearchProductForm({ setIsLoading, setCellPhones }); // Importa el hook personalizado para manejar el formulario de búsqueda

  return (
    <form
      className="relative flex flex-col items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full relative">
        <Input
          type="search"
          placeholder="Buscar por modelo, marca o precio..."
          className="w-full pl-8 pr-12"
          {...register("search")}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-0 top-0 h-full px-2.5"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
      {/* Mensaje de error si el campo de búsqueda no es válido */}
      {errors.search && (
        <p className="text-red-500 text-sm mt-1">{errors.search.message}</p>
      )}
    </form>
  );
}
