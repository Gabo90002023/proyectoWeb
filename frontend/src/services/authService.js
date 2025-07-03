// src/services/authService.js
import api from './apiConfig';

// Login
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    console.log('Respuesta del backend:', response.data);

    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('userRole', response.data.user.role);

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
        expiresIn: response.data.expires_in,
      };
    } else {
      throw new Error(response.data.message || 'Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error en loginUser:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error al iniciar sesión');
  }
};

// Registro
export const registerUser = async (userData) => {
  try {
    const backendData = {
      full_name: userData.nombre,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
    };

    const response = await api.post('/register', backendData);

    if (response.data.success) {
      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
        message: 'Usuario registrado correctamente',
      };
    } else {
      throw new Error(response.data.message || 'Error al registrar usuario');
    }
  } catch (error) {
    console.error('Error en registerUser:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error al registrar usuario');
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.error('Error en logoutUser:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    window.location.href = "/"; // 🔁 Redirección inmediata al inicio
  }
};

// Obtener usuario actual desde backend
export const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/me');
    localStorage.setItem('user', JSON.stringify(response.data));
    return {
      success: true,
      user: response.data,
    };
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      window.location.href = "/"; // 🔁 Redirige si expira la sesión
    }
    throw error;
  }
};

// Obtener usuario desde localStorage
export const getCurrentUser = () => {
  const userJSON = localStorage.getItem('user');
  try {
    return userJSON ? JSON.parse(userJSON) : null;
  } catch (error) {
    console.error('Error al parsear usuario:', error);
    return null;
  }
};

// Verificación rápida
export const isAuthenticated = () => localStorage.getItem('token') !== null;
export const hasRole = (role) => localStorage.getItem('userRole') === role;
export const isAdmin = () => hasRole('admin');
