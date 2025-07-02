import api from './apiConfig'; // tu instancia Axios

export const obtenerCantidadProfesores = async () => {
  const res = await api.get('/admin/profesores/count');
  return res.data.total;
};

export const obtenerCantidadPreguntas = async () => {
  const res = await api.get('/admin/preguntas/count');
  return res.data.total;
};
