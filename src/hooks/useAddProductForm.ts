import { AddProduct, AddProductSchema } from "@/schemas/product.schema";
import { addProduct } from "@/services/product.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useAddProductForm({
  setIsDialogOpen,
  setShowSuccessModal,
  setSuccess,
  fetchInformation,
}: {
  setIsDialogOpen: (value: boolean) => void;
  setShowSuccessModal: (value: boolean) => void;
  setSuccess: React.Dispatch<React.SetStateAction<"success" | "error">>;
  fetchInformation: () => Promise<void>;
}) {
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta de error
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío del formulario

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(AddProductSchema),
  });

  const onSubmit = async (data: AddProduct) => {
    try {
      setIsSubmitting(true); // Muestra el estado de envío
      setShowAlert(false); // Oculta la alerta si estaba visible
      // Parsear los datos
      const dataParse = {
        ...data,
        id_marca: parseInt(data.id_marca ?? "0", 10),
        id_tipo_producto: parseInt(data.id_tipo_producto ?? "0", 10),
        precio_compra: parseInt(data.precio_compra ?? "0", 10),
        precio_venta: parseInt(data.precio_venta ?? "0", 10),
        stock: parseInt(data.stock ?? "0", 10),
      };

      const fetch = await addProduct(dataParse); // Llama al servicio para agregar el producto

      if (fetch?.code === 200) {
        setSuccess("success"); // Cambia el estado a error si la respuesta no es exitosa
        await fetchInformation();
      }

      reset(); // Limpia el formulario
    } catch {
      // Si ocurre un error, mostramos la alerta
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
      setIsDialogOpen(false); // Cierra el modal al finalizar
      setShowSuccessModal(true); // Muestra el modal de éxito o error
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit, () => {
    // Si hay errores en los campos del formulario
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  });

  return {
    showAlert,
    setShowAlert,
    isSubmitting,
    setIsSubmitting,
    register,
    control,
    handleFormSubmit,
    reset,
    errors,
  };
}
