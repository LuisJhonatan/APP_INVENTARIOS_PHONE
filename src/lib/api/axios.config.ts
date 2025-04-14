import axios from "axios";

/// Crear una instancia de Axios con la configuración predeterminada
/// Esta instancia se usará para realizar solicitudes de API en toda la aplicación.
// Puede personalizar la URL base y los encabezados según sea necesario.
const apiClient = axios.create({
  baseURL: "https://pqxvmm6v-3000.brs.devtunnels.ms/api/", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;
