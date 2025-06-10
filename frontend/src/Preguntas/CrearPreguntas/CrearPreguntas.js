import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CrearPreguntas.css';
import { Plus } from "lucide-react";
import { FaArrowLeft, FaBrain, FaEye, FaSave } from 'react-icons/fa';

const CrearPreguntas = () => {
 

  return (
    <div className="fullscreen-container">
      <header className="header">
      <div className="container">
        <div className="left-section">
          <button
            onClick={() => window.history.back()}
            className="btn-outline btn-sm"
            type="button"
          >
            <FaArrowLeft className="icon-left" />
            Volver
          </button>

          <div className="title-group">
            <FaBrain className="icon-brain" />
            <h1 className="title">Editor de Preguntas</h1>
          </div>
        </div>

        <div className="right-section">
          <button
            className="btn-outline btn-yellow"
            type="button"
          >
            <FaEye className="icon-left" />
          </button>

          <button
            className="btn-green"
            type="button"
          >
            <FaSave className="icon-left" />
            Guardar
          </button>
        </div>
      </div>
    </header>
      <main className="container-main">
          <div className="grid-container">
            <div className="card">
              <div className="card-header">
                  <h2 className="text-primary">Información Básica</h2>
                  <p className="text-muted">Configura los datos principales de la pregunta</p>
              </div>
            <div className="card-content space-y-4">
              <div className="space-y-2">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"                  
                  className="input"
                  placeholder="Título del desafío"
                />
              </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>Grupo de Edad</label>
              <select
                
                className="input"
              >
                <option value="">Seleccionar</option>
                <option value="3-6">3-6 años</option>
                <option value="7-10">7-10 años</option>
                <option value="11-14">11-14 años</option>
                <option value="15-18">15-18 años</option>
              </select>
            </div>

            <div className="space-y-2">
              <label>Dificultad</label>
              <select
               
                className="input"
              >
                <option value="">Seleccionar</option>
                <option value="basico">Básico</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label>Tipo de Pregunta</label>
            <select
              
              className="input"
            >
              <option value="">Seleccionar</option>
              <option value="secuencial">Secuencial</option>
              <option value="algoritmica">Algorítmica</option>
              <option value="logica">Lógica</option>
              <option value="patron">Patrón</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
             
              className="textarea"
              placeholder="Describe el problema o desafío..."
            />
          </div>
        </div>
      </div>

      {/* Contenido y Opciones */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-secondary">Contenido y Opciones</h2>
          <p className="text-muted">Define el contenido interactivo y las respuestas</p>
        </div>
        <div className="card-content space-y-4">
          <div className="space-y-2">
            <label htmlFor="content">Contenido Interactivo</label>
            <ReactQuill
              id="content"

              className="quill-editor font-mono"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label>Opciones de Respuesta</label>
              <button  className="btn-ef">
                <Plus className="icon-small" />
                Agregar
              </button>
            </div>

            
          </div>

          <div className="space-y-2">
            <label>Respuesta Correcta</label>
            <select
              
              className="input"
            >
              <option value="">Seleccionar respuesta correcta</option>
              
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="explanation">Explicación</label>
            <textarea
              id="explanation"
             
              className="textarea"
              placeholder="Explica la solución y el razonamiento..."
            />
          </div>
        </div>
      </div>
    </div>
      </main>

 </div>
    
  );
};

export default CrearPreguntas;
