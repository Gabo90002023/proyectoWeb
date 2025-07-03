import api from './apiConfig';

// Obtener todas las preguntas
export const getAllPreguntas = async () => {
  try {
    const response = await api.get('user/preguntas');
    console.log(response);
    return response.data.map(p => mapPreguntaFromBackend(p));
    
  } catch (error) {
    console.error('Error al obtener preguntas:', error);
    throw error;
  }
};

// Obtener pregunta por ID
export const getPreguntaById = async (id) => {
  try {
    const response = await api.get(`user/preguntas/${id}`);
    return mapPreguntaFromBackend(response.data);
  } catch (error) {
    console.error(`Error al obtener la pregunta con ID ${id}:`, error);
    throw error;
  }
};

// Crear nueva pregunta
export const createPregunta = async (pregunta) => {
  try {
    const payload = mapPreguntaToBackend(pregunta)
    console.log("Payload a enviar:", payload)
    const response = await api.post('user/preguntas', mapPreguntaToBackend(pregunta));
    return mapPreguntaFromBackend(response.data);
  } catch (error) {
    console.error('Error al crear la pregunta:', error);
    throw error;
  }
};

// Actualizar una pregunta
export const updatePregunta = async (id, pregunta) => {
  try {
    const response = await api.put(`user/preguntas/${id}`, mapPreguntaToBackend(pregunta));
    return mapPreguntaFromBackend(response.data);
  } catch (error) {
    console.error(`Error al actualizar la pregunta con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar una pregunta
export const deletePregunta = async (id) => {
  try {
    const response = await api.delete(`user/preguntas/${id}`);
    return {
      success: true,
      id,
      message: response.data.message,
    };
  } catch (error) {
    console.error(`Error al eliminar la pregunta con ID ${id}:`, error);
    throw error;
  }
};

/// ─────────────────────────────────────────────
/// 📦 Mapeo entre frontend y backend
/// ─────────────────────────────────────────────

const mapPreguntaFromBackend = (p) => ({
  id: p.id,
  title: p.titulo,
  instructions: p.instrucciones,
  question: p.pregunta,
  generalExplanation: p.explicacion_general,
  items: (p.items || []).map(it => ({
    id: it.id?.toString(),
    content: it.contenido,
    imageUrl: it.imagen_url,
    explanation: it.explicacion,
  })),
  sequences: (p.secuencias || []).map(seq => ({
    id: seq.id?.toString(),
    name: seq.nombre,
    explanation: seq.explicacion,
    items: (seq.items || []).map(i => i.id?.toString())
  })),
});


const mapPreguntaToBackend = (p) => ({
  titulo: p.title,
  instrucciones: p.instructions,
  pregunta: p.question,
  explicacion_general: p.generalExplanation,
  items: (p.items || []).map(it => ({
    id: it.id,
    contenido: it.content || "",          // ← ✅ CORRECTO
    imagen_url: it.imageUrl || "",        // ← ✅ CORRECTO
    explicacion: it.explanation || "",    // ← ✅ CORRECTO
  })),
  secuencias: (p.sequences || []).map(seq => ({
    nombre: seq.name || "Sin nombre",     // ← ✅ CORRECTO
    explicacion: seq.explanation || "",
    items: seq.items || [],
  })),
});



