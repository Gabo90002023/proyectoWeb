import React from 'react';
import './VistaPregunta.css';

const VistaPregunta = ({ pregunta }) => {
  return (
    <div className="vista-post">
      <h2>{pregunta.title}</h2>

      <div className="meta-info">
        <span>👤 {pregunta.autor}</span>
        <span>🕒 {new Date().toLocaleString()}</span>
      </div>

      <div className="section">
        <h5>📝 Instrucciones</h5>
        <div dangerouslySetInnerHTML={{ __html: pregunta.instrucciones }} />
      </div>

      <div className="section">
        <h5>❓ Pregunta</h5>
        <div dangerouslySetInnerHTML={{ __html: pregunta.pregunta }} />
      </div>

      <div className="section">
        <h5>✅ Opciones de respuesta</h5>
        {pregunta.respuestas.map((r, i) => (
          <div key={i} className={`respuesta-item ${r.correcta ? 'correcta' : ''}`}>
            {r.imagen && (
              <img src={r.imagen} alt={`Respuesta ${i + 1}`} />
            )}
            <p>{r.texto}</p>
            {r.correcta && <span className="correct-label">✔ Correcta</span>}
          </div>
        ))}
      </div>

      <div className="section">
        <h5>💡 Explicación</h5>
        <div dangerouslySetInnerHTML={{ __html: pregunta.explicacion }} />
      </div>
    </div>
  );
};

export default VistaPregunta;
