import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AddProduct } from "@/schemas/product.schema";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

export default function AddProductForm({
  showAlert,
  isSubmitting,
  register,
  handleFormSubmit,
  errors,
  control,
}: {
  showAlert: boolean;
  isSubmitting: boolean;
  register: UseFormRegister<AddProduct>;
  handleFormSubmit: () => void;
  errors: FieldErrors<AddProduct>;
  control: Control<AddProduct>;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Registrar Nuevo Producto</DialogTitle>
        <DialogDescription>
          Complete el formulario para agregar un nuevo producto al inventario.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleFormSubmit} className="grid gap-4">
        {showAlert && (
          <Alert
            variant="default"
            className="mb-4 bg-yellow-50 border-yellow-200"
          >
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">
              Por favor completar todos los campos requeridos
            </AlertTitle>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="nombre_producto"
              className={`text-right ${
                errors.nombre_producto ? "text-red-600" : ""
              }`}
            >
              Nombre *
            </Label>
            <Input
              id="nombre"
              className="col-span-3"
              placeholder="iPhone 15 Pro"
              {...register("nombre_producto")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descripcion" className="text-right">
              Descripción
            </Label>
            <Textarea
              id="descripcion"
              className="col-span-3"
              placeholder="Características del producto"
              {...register("descripcion")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="id_marca"
              className={`text-right ${errors.id_marca ? "text-red-600" : ""}`}
            >
              Marca *
            </Label>
            <div className="col-span-3 space-y-1">
              <Controller
                name="id_marca"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="id_marca">
                      <SelectValue placeholder="Seleccionar marca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">iPhone</SelectItem>
                      <SelectItem value="2">Huawei</SelectItem>
                      <SelectItem value="3">Oppo</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="id_tipo_producto"
              className={`text-right ${
                errors.id_tipo_producto ? "text-red-600" : ""
              }`}
            >
              Tipo *
            </Label>
            <div className="col-span-3 space-y-1">
              <Controller
                name="id_tipo_producto"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="id_tipo_producto">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="precio_compra" className="text-right">
              Precio Compra
            </Label>
            <Input
              id="precio_compra"
              type="number"
              className="col-span-3"
              placeholder="0.00"
              {...register("precio_compra")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="precio_venta"
              className={`text-right ${
                errors.precio_venta ? "text-red-600" : ""
              }`}
            >
              Precio Venta *
            </Label>
            <Input
              id="precio_venta"
              type="number"
              className="col-span-3"
              placeholder="0.00"
              {...register("precio_venta")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              id="stock"
              type="number"
              className="col-span-3"
              placeholder="0"
              {...register("stock")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar Producto"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
