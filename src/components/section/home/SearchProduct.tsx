"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Product,
  SearchByWord,
  SearchByWordSchema,
} from "@/schemas/product.schema";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { searchProductByWord } from "@/services/product.service";
import CarProduct from "@/components/ui/CarProduct";

export default function SearchProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchByWord>({
    resolver: zodResolver(SearchByWordSchema),
  }); //useForm para manejar el formulario de búsqueda

  const [isLoading, setIsLoading] = useState(true); //maneja el estado de carga de los productos

  const [cellPhoneBrand, setCellPhoneBrand] = useState<
    { id: number; name: string }[]
  >([]); //maneja el estado de las marcas de celulares

  const [cellPhones, setCellPhones] = useState<Product[]>([]); //maneja el estado de los productos encontrados

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

  useEffect(() => {
    setCellPhoneBrand([
      { id: 1, name: "iPhone" },
      { id: 2, name: "Huawei" },
      { id: 3, name: "Oppo" },
    ]);
  }, []);

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Buscar Productos</CardTitle>
          <CardDescription>
            Encuentra rápidamente los productos en tu inventario.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Formulario de búsqueda de productos */}
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
              <p className="text-red-500 text-sm mt-1">
                {errors.search.message}
              </p>
            )}
          </form>

          <Tabs defaultValue="iphone" className="my-4">
            {/* Lista de marcas de celulares */}
            <TabsList className="grid w-full grid-cols-3">
              {cellPhoneBrand.map((brand) => {
                return (
                  <TabsTrigger key={brand.id} value={brand.name.toLowerCase()}>
                    {brand.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Skeleton antes de renderizar la información */}
            <TabsContent value="iphone">
              {isLoading && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="h-6 bg-muted rounded w-3/4"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Productos encontrados */}
              {cellPhones.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-[304px] overflow-y-auto">
                  {cellPhones.map((product, index) => {
                    return <CarProduct key={index} {...product} />;
                  })}
                </div>
              ) : (
                cellPhones.length === 0 &&
                !isLoading && (
                  <div>
                    <p className="text-muted-foreground text-sm text-center">
                      No hay productos disponibles
                    </p>
                  </div>
                )
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
