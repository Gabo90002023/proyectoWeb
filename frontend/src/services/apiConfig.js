// src/services/apiConfig.js
import axios from "axios";

// Configura la URL base de la API
const API_URL = "http://localhost:8000/api";

// Crear una instancia de axios con configuración personalizada
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

// Interceptor para manejar tokens de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores globales
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Error en la petición API:", error.message);

    // Si el error es 401 (no autorizado)
    if (error.response && error.response.status === 401) {
      const requestUrl = error.config.url;

      // Evitar redirección si el error viene del endpoint de login
      const isLoginAttempt = requestUrl.includes("/login");

      if (!isLoginAttempt) {
        console.log("Sesión expirada. Redirigiendo al inicio de sesión...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");

        // Redirigir a la pantalla de inicio/login
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
