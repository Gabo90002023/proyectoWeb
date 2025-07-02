import api from './apiConfig';

// Obtener todos los profesores
export const getUsuarios = async () => {
  const res = await api.get('/admin/usuarios');
  return res.data;
};

// Crear profesor
export const crearUsuario = async (data) => {
  const res = await api.post('/admin/usuarios', data);
  return res.data;
};

// Actualizar profesor
export const actualizarUsuario = async (id, data) => {
  const res = await api.put(`/admin/usuarios/${id}`, data);
  return res.data;
};

// Eliminar profesor
export const eliminarUsuario = async (id) => {
  await api.delete(`/admin/usuarios/${id}`);
};
