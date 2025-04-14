"use client";
import { Button } from "@/components/ui/button";
import CarDetail from "@/components/ui/CarDetail";
import { useFetchInformation } from "@/hooks/useFetchInformation";
import {
  BarChart3,
  Package,
  PlusCircle,
  ShoppingCart,
  Smartphone,
} from "lucide-react";

export default function Summary() {

  const {isLoading, information} = useFetchInformation();

  return (
    <>
      {/* Sección de encabezado y descripción */}
      <section className="max-w-7xl flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Panel de Control
          </h1>
          <p className="text-muted-foreground">
            Gestiona tu inventario de celulares y controla tus ventas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button className="cursor-pointer">
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Producto
          </Button>
        </div>
      </section>

      {/* Sección de detalles del resumen */}
      <section className="max-w-7xl grid gap-4 md:grid-cols-2 lg:grid-cols-4 mx-auto p-4 sm:p-6 lg:p-8">
        <CarDetail
          title="Total Productos"
          firstValue={information?.total_productos.toString() || "0.0"}
          secondValue="+12 desde el mes pasado"
          isLoading={isLoading}
          Icon={Package}
        />
        <CarDetail
          title="Ventas del mes"
          firstValue={`$${information?.ventas_mes}` || "0.0"}
          secondValue="+15% desde el mes pasado"
          isLoading={isLoading}
          Icon={ShoppingCart}
        />
        <CarDetail
          title="Productos Agotados"
          firstValue={information?.productos_agotados.toString() || "0"}
          secondValue="-3 desde el mes pasado"
          isLoading={isLoading}
          Icon={BarChart3}
        />
        <CarDetail
          title="Marcas disponibles"
          firstValue={information?.marcas_disponibles.toString() || "0"}
          secondValue="Iphone, Samsung, Xiaomi, ..."
          isLoading={isLoading}
          Icon={Smartphone}
        />
      </section>
    </>
  );
}
