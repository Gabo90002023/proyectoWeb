import api from './apiConfig';

// Obtener todas las secuencias
export const getAllSecuencias = async () => {
  try {
    const response = await api.get('/secuencias');
    return response.data.map(sec => ({
      id: sec.id,
      preguntaId: sec.pregunta_id,
      name: sec.nombre,
      explanation: sec.explicacion,
      items: sec.items.map(i => i.id)
    }));
  } catch (error) {
    console.error('Error al obtener las secuencias:', error);
    throw error;
  }
};

// Obtener secuencia por ID
export const getSecuenciaById = async (id) => {
  try {
    const response = await api.get(`/secuencias/${id}`);
    const sec = response.data;

    return {
      id: sec.id,
      preguntaId: sec.pregunta_id,
      name: sec.nombre,
      explanation: sec.explicacion,
      items: sec.items.map(i => i.id)
    };
  } catch (error) {
    console.error(`Error al obtener la secuencia con ID ${id}:`, error);
    throw error;
  }
};

// Crear secuencia
export const createSecuencia = async (secuenciaData) => {
  try {
    const payload = {
      pregunta_id: secuenciaData.preguntaId,
      nombre: secuenciaData.name,
      explicacion: secuenciaData.explanation,
      items: secuenciaData.items // array de IDs en orden
    };

    const response = await api.post('/secuencias', payload);
    return response.data;
  } catch (error) {
    console.error('Error al crear la secuencia:', error);
    throw error;
  }
};

// Actualizar secuencia
export const updateSecuencia = async (id, secuenciaData) => {
  try {
    const payload = {
      nombre: secuenciaData.name,
      explicacion: secuenciaData.explanation,
      items: secuenciaData.items // array de IDs en orden
    };

    const response = await api.put(`/secuencias/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la secuencia con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar secuencia
export const deleteSecuencia = async (id) => {
  try {
    const response = await api.delete(`/secuencias/${id}`);
    return {
      success: true,
      id,
      message: response.data.message
    };
  } catch (error) {
    console.error(`Error al eliminar la secuencia con ID ${id}:`, error);
    throw error;
  }
};
