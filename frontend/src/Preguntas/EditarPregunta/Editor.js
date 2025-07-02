import React from 'react';
import './Editor.css';

const Editor = () => {
  return (
    <div className="editor-container">
      <div className="editor-card">
        <h1 className="editor-title">Editor de Preguntas Secuenciales</h1>
        <p className="editor-subtitle">Crea actividades interactivas de ordenamiento secuencial</p>

        <div className="editor-box">
          <h2 className="editor-question">Ordena la secuencia de cocinar un huevo</h2>
          <p className="editor-instruction">Arrastra las imágenes al orden correcto para cocinar un huevo frito</p>
          <p className="editor-highlight">
            ¿Cuál es el orden correcto para cocinar un huevo frito?
          </p>

          <div className="editor-options">
            <button className="editor-option">🥚 Huevo crudo</button>
            <button className="editor-option">🍳 Calentar sartén</button>
            <button className="editor-option">🍳 Huevo frito</button>
          </div>

          <div className="editor-buttons">
            <button className="preview-btn">▶ Vista Previa</button>
            <div className="icon-buttons">
              <button className="edit-btn">✏️</button>
              <button className="delete-btn">🗑️</button>
            </div>
          </div>
        </div>

        <div className="new-question-btn-container">
          <button className="new-question-btn">＋ Nueva pregunta</button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
