import React, { useState, useCallback } from 'react';

import SummernoteEditor from './SummernoteEditor';
import './CrearPreguntaCK.css';

const CrearPreguntaCK = () => {
  const [formulario, setFormulario] = useState({
    autor: '',
    title: '',
    instrucciones: '',
    pregunta: '',
    explicacion: '',
    is_active: '1',
    respuestas: [{ texto: '', correcta: false, imagen: null }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleInstruccionesChange = useCallback((value) => {
    setFormulario((prev) => ({ ...prev, instrucciones: value }));
  }, []);

  const handlePreguntaChange = useCallback((value) => {
    setFormulario((prev) => ({ ...prev, pregunta: value }));
  }, []);

  const handleExplicacionChange = useCallback((value) => {
    setFormulario((prev) => ({ ...prev, explicacion: value }));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    const tieneCorrecta = formulario.respuestas.some((r) => r.correcta);
    if (!tieneCorrecta) {
      alert('Debes marcar al menos una respuesta como correcta.');
      return;
    }

    console.log(formulario);
    alert('Formulario enviado. Revisa la consola');
  };

  const agregarRespuesta = () => {
    setFormulario((prev) => ({
      ...prev,
      respuestas: [...prev.respuestas, { texto: '', correcta: false, imagen: null }],
    }));
  };

  const actualizarRespuesta = (index, value) => {
    const nuevas = [...formulario.respuestas];
    nuevas[index].texto = value;
    setFormulario((prev) => ({ ...prev, respuestas: nuevas }));
  };

  const marcarCorrecta = (index) => {
    const nuevas = formulario.respuestas.map((r, i) => ({
      ...r,
      correcta: i === index,
    }));
    setFormulario((prev) => ({ ...prev, respuestas: nuevas }));
  };

  const actualizarImagen = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const nuevas = [...formulario.respuestas];
      nuevas[index].imagen = reader.result;
      setFormulario((prev) => ({ ...prev, respuestas: nuevas }));
    };
    reader.readAsDataURL(file);
  };

  const eliminarRespuesta = (index) => {
    const nuevas = formulario.respuestas.filter((_, i) => i !== index);
    setFormulario((prev) => ({ ...prev, respuestas: nuevas }));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-5">
        Editor de Preguntas
        <hr />
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Título</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formulario.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Autor</label>
            <input
              type="text"
              className="form-control"
              name="autor"
              value={formulario.autor}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Instrucciones</label>
          <SummernoteEditor value={formulario.instrucciones} onChange={handleInstruccionesChange} />
        </div>

        <div className="mb-3">
          <label>Pregunta</label>
          <SummernoteEditor value={formulario.pregunta} onChange={handlePreguntaChange} />    
        </div>

        <div className="mb-3">
          <label>Posibles respuestas</label>
          {formulario.respuestas.map((respuesta, index) => (
            <div key={index} className="respuesta-box">
              <div className="respuesta-header">
                <strong>Respuesta {index + 1}</strong>
                <button type="button" className="btn-eliminar" onClick={() => eliminarRespuesta(index)}>
                  🗑 Eliminar
                </button>
              </div>

              <input
                type="text"
                placeholder="Texto de la respuesta"
                value={respuesta.texto}
                onChange={(e) => actualizarRespuesta(index, e.target.value)}
                className="form-control mb-2"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => actualizarImagen(index, e.target.files[0])}
                className="form-control mb-2"
              />

              {respuesta.imagen && (
                <img
                  src={respuesta.imagen}
                  alt={`Respuesta ${index + 1}`}
                  className="img-thumbnail mb-2"
                  style={{ maxWidth: '200px' }}
                />
              )}

              <button
                type="button"
                className={`btn-marcar ${respuesta.correcta ? 'correcta' : ''}`}
                onClick={() => marcarCorrecta(index)}
              >
                {respuesta.correcta ? '✔ Respuesta correcta' : 'Marcar como correcta'}
              </button>
            </div>
          ))}

          <button type="button" className="btn btn-outline-primary mt-2" onClick={agregarRespuesta}>
            + Añadir otra respuesta
          </button>
        </div>

        <div className="mb-3">
          <label>Explicación de la respuesta</label>
          <SummernoteEditor value={formulario.explicacion} onChange={handleExplicacionChange} />
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Guardar pregunta
        </button>
      </form>
    </div>
  );
};

export default CrearPreguntaCK;
