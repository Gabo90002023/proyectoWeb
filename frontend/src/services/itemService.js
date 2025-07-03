import api from './apiConfig';

// Obtener todos los ítems
export const getAllItems = async () => {
  try {
    const response = await api.get('/items');
    return response.data.map(item => ({
      id: item.id,
      preguntaId: item.pregunta_id,
      content: item.contenido,
      imageUrl: item.imagen_url,
      explanation: item.explicacion
    }));
  } catch (error) {
    console.error('Error al obtener los ítems:', error);
    throw error;
  }
};

// Obtener ítem por ID
export const getItemById = async (id) => {
  try {
    const response = await api.get(`/items/${id}`);
    const item = response.data;

    return {
      id: item.id,
      preguntaId: item.pregunta_id,
      content: item.contenido,
      imageUrl: item.imagen_url,
      explanation: item.explicacion
    };
  } catch (error) {
    console.error(`Error al obtener el ítem con ID ${id}:`, error);
    throw error;
  }
};

// Crear nuevo ítem
export const createItem = async (itemData) => {
  try {
    const payload = {
      pregunta_id: itemData.preguntaId,
      contenido: itemData.content,
      imagen_url: itemData.imageUrl,
      explicacion: itemData.explanation
    };

    const response = await api.post('/items', payload);
    return response.data;
  } catch (error) {
    console.error('Error al crear el ítem:', error);
    throw error;
  }
};

// Actualizar ítem
export const updateItem = async (id, itemData) => {
  try {
    const payload = {
      contenido: itemData.content,
      imagen_url: itemData.imageUrl,
      explicacion: itemData.explanation
    };

    const response = await api.put(`/items/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el ítem con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar ítem
export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/items/${id}`);
    return {
      success: true,
      id,
      message: response.data.message
    };
  } catch (error) {
    console.error(`Error al eliminar el ítem con ID ${id}:`, error);
    throw error;
  }
};
