"use client";
import { Button } from "@/components/ui/button";
import CarDetail from "@/components/ui/CarDetail";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAddProductForm } from "@/hooks/useAddProductForm";
import { useFetchInformation } from "@/hooks/useFetchInformation";
import {
  BarChart3,
  Package,
  PlusCircle,
  ShoppingCart,
  Smartphone,
} from "lucide-react";
import AddProductForm from "../_components/AddProductForm";
import SuccessModal from "@/components/ui/SuccesModal";
import { useState } from "react";
export default function Summary() {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar el modal de agregar producto
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para mostrar el modal de éxito o error
  const [success, setSuccess] = useState<"success" | "error">("error"); // Estado para determinar si la operación fue exitosa o no
  const { isLoading, information, fetchInformation } = useFetchInformation(); // Hook para obtener la información del resumen
  const {
    showAlert,
    isSubmitting,
    register,
    control,
    handleFormSubmit,
    errors,
  } = useAddProductForm({
    setIsDialogOpen,
    setShowSuccessModal,
    setSuccess,
    fetchInformation,
  }); // Hook para manejar el formulario de agregar producto

  return (
    <>
      {/* Sección de descripcion y agregar producto */}
      <section className="max-w-7xl flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título y descripción del panel de control */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Panel de Control
          </h1>
          <p className="text-muted-foreground">
            Gestiona tu inventario de celulares y controla tus ventas.
          </p>
        </div>

        {/* Botón para agregar un nuevo producto */}
        <div className="flex items-center gap-2">
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              //if (!open) reset(); // Limpiar el formulario al cerrar
            }}
          >
            <DialogTrigger asChild>
              <Button className="cursor-pointer">
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AddProductForm
                showAlert={showAlert}
                isSubmitting={isSubmitting}
                register={register}
                handleFormSubmit={handleFormSubmit}
                errors={errors}
                control={control}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Modal de éxito o error al agregar producto */}
        <SuccessModal
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
          type={success}
        />
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
