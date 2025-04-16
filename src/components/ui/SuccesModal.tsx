import { CheckCircle, XCircle } from "lucide-react"; // Importamos un ícono adicional para el error
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

type ModalType = "success" | "error";

export default function SuccessModal({
  showSuccessModal,
  setShowSuccessModal,
  type,
}: {
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
  type: ModalType;
}) {
  const isSuccess = type === "success";

  return (
    <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {isSuccess ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
            {isSuccess ? "Operación Exitosa" : "Operación Fallida"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isSuccess
              ? "Producto Registrado con éxito"
              : "Hubo un error al registrar el producto"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className={`${
              isSuccess
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            } text-white`}
            onClick={() => setShowSuccessModal(false)}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}