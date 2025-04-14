"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MarkProduct } from "@/schemas/product.schema";
import { BarChart3, Package, Settings, ShoppingCart } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CarProduct from "@/components/ui/CarProduct";
import Link from "next/link";
import SearchProductForm from "../_components/SearchProductForm";
import { useFetchCellPhones } from "@/hooks/useFetchCellPhones";

export default function SearchProduct() {
  const [cellPhoneBrand, setCellPhoneBrand] = useState<MarkProduct[]>([]); //maneja el estado de las marcas de celulares
  const [selectedBrand, setSelectedBrand] = useState<number>(1); // Marca seleccionada
  const { isLoading, setIsLoading, setCellPhones, filteredCellPhones } =
    useFetchCellPhones(selectedBrand); // Llama al hook para cargar los productos al renderizar la página

  useEffect(() => {
    setCellPhoneBrand([
      { id: 1, name: "iPhone" },
      { id: 2, name: "Huawei" },
      { id: 3, name: "Oppo" },
    ]);
  }, []);

  
  /*useEffect(()=>{
    console.log(selectedBrand, );
    
    console.log(filteredCellPhones);

  }, [filteredCellPhones])*/
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
          <SearchProductForm
            setCellPhones={setCellPhones}
            setIsLoading={setIsLoading}
          />

            <Tabs
            defaultValue="1"
            className="my-4"
            onValueChange={(value) => setSelectedBrand(Number(value))} // Actualiza la marca seleccionada
            >
            {/* Lista de marcas de celulares */}
            <TabsList className="grid w-full grid-cols-3">
              {cellPhoneBrand.map((brand) => {
              return (
                <TabsTrigger key={brand.id} value={brand.id.toString()}>
                {brand.name}
                </TabsTrigger>
              );
              })}
            </TabsList>

            {/* Skeleton antes de renderizar la información */}
            <TabsContent value={selectedBrand.toString()}>
              {isLoading && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                  <div className="h-6 rounded w-3/4 bg-pink-200"></div>
                  </CardHeader>
                  <CardContent>
                  <div className="h-4 rounded w-1/2 mb-2 bg-pink-200"></div>
                  <div className="h-4 rounded w-1/3 bg-pink-200"></div>
                  </CardContent>
                </Card>
                ))}
              </div>
              )}

              {/* Productos encontrados */}
              {filteredCellPhones.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-[304px] overflow-y-auto">
                {filteredCellPhones.map((product, index) => {
                return <CarProduct key={index} {...product} />;
                })}
              </div>
              ) : (
              filteredCellPhones.length === 0 &&
              !isLoading && (
                <div>
                <p className="text-muted-foreground text-sm text-center">
                  No hay productos disponibles para esta marca
                </p>
                </div>
              )
              )}
            </TabsContent>
            </Tabs>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Acceso Rápido</CardTitle>
          <CardDescription>
            Accede rápidamente a las funciones principales.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all hover:bg-muted"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
              <Package className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <div className="font-semibold">Gestionar Inventario</div>
              <div className="text-xs text-muted-foreground">
                Añadir, editar o eliminar productos
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all hover:bg-muted"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="font-semibold">Registrar Venta</div>
              <div className="text-xs text-muted-foreground">
                Crear una nueva venta y actualizar inventario
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all hover:bg-muted"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
              <BarChart3 className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <div className="font-semibold">Reportes</div>
              <div className="text-xs text-muted-foreground">
                Ver estadísticas y generar informes
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all hover:bg-muted"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <Settings className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <div className="font-semibold">Configuración</div>
              <div className="text-xs text-muted-foreground">
                Ajustar preferencias y usuarios
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
