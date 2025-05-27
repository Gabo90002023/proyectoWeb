import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CrearPreguntas.css';

const CrearPreguntas = () => {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    explicacion: '',
    contenido: ''
  });

  const [fullScreen, setFullScreen] = useState(false);
  const quillRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContenidoChange = (value) => {
    setForm(prev => ({ ...prev, contenido: value }));
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert('Pregunta guardada! Revisa consola.');
  };

  return (
    <div className={`crear-pregunta-container ${fullScreen ? 'fullscreen' : ''}`}>
      <h2 className="titulo">Crear Nueva Pregunta</h2>

      <button type="button" onClick={toggleFullScreen} className="expand-button">
        {fullScreen ? 'Minimizar Editor' : 'Maximizar Editor'}
      </button>

      <form className="formulario" onSubmit={handleSubmit}>
        <label>Título:
          <input type="text" name="titulo" value={form.titulo} onChange={handleChange} required />
        </label>

        <label>Contenido con imágenes y texto:</label>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={form.contenido}
          onChange={handleContenidoChange}
          modules={{
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['link', 'image'],
              ['clean']
            ]
          }}
          formats={[
            'header', 'bold', 'italic', 'underline',
            'list', 'bullet', 'link', 'image'
          ]}
          className="editor"
        />

        <label>Descripción:
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
        </label>

        <label>Explicación de la pregunta:
          <textarea name="explicacion" value={form.explicacion} onChange={handleChange} />
        </label>

        <button type="submit" className="boton">Guardar Pregunta</button>
      </form>
    </div>
  );
};

export default CrearPreguntas;
