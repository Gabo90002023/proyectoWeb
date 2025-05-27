import React, { useState } from 'react';
import './VerPreguntas.css';

const preguntas = [
  {
    pregunta: "¿Qué lenguaje se utiliza para el desarrollo web del lado del cliente?",
    opciones: ["Python", "JavaScript", "C#", "Java"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué significa CSS?",
    opciones: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Cuál de los siguientes es un framework de JavaScript?",
    opciones: ["Laravel", "Django", "React", "Flask"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué es un componente en React?",
    opciones: [
      "Una función o clase que retorna un fragmento de UI",
      "Un archivo CSS",
      "Una base de datos",
      "Un tipo de variable",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Qué hace el método `setState` en React?",
    opciones: [
      "Modifica directamente el DOM",
      "Actualiza el estado y vuelve a renderizar el componente",
      "Llama una API externa",
      "Elimina un componente",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué estructura de datos utiliza una cola?",
    opciones: ["FIFO", "LIFO", "LILO", "FILO"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué es Git?",
    opciones: [
      "Un lenguaje de programación",
      "Un sistema de control de versiones",
      "Un editor de texto",
      "Un servidor web",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué palabra clave se usa para declarar una constante en JavaScript?",
    opciones: ["var", "let", "const", "constant"],
    correcta: 2,
  },
];

const VerPreguntas = () => {
  const [indice, setIndice] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);

  const manejarRespuesta = (idxOpcion) => {
    if (idxOpcion === preguntas[indice].correcta) {
      setPuntaje(puntaje + 1);
    }
    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1);
    } else {
      setTerminado(true);
    }
  };

  const reiniciarQuiz = () => {
    setIndice(0);
    setTerminado(false);
    setPuntaje(0);
  };

  const irAtras = () => {
    if (indice > 0) {
      setIndice(indice - 1);
    }
  };

  if (terminado) {
    return (
      <section className="hero-section">
        <div className="quiz-card-wrapper">
          <div className="quiz-card">
            <h2 className="hero-title">¡Has terminado!</h2>
            <p className="hero-subtitle">
              Tu puntaje es {puntaje} de {preguntas.length}
            </p>
            <button className="btn-primary" onClick={reiniciarQuiz}>
              Reiniciar Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section">
      <div className="quiz-card-wrapper">
        <div className="quiz-card">
          <div className="quiz-header">
            <h2 className="question">{preguntas[indice].pregunta}</h2>
            <span className="quiz-live">
              Pregunta {indice + 1} de {preguntas.length}
            </span>
          </div>
          <div className="answers">
            {preguntas[indice].opciones.map((opcion, idx) => (
              <button
                key={idx}
                className="answer"
                onClick={() => manejarRespuesta(idx)}
              >
                {opcion}
              </button>
            ))}
          </div>
          <div className="quiz-footer">
            <button
              className="btn-secondary"
              onClick={irAtras}
              disabled={indice === 0}
            >
              Atrás
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerPreguntas;
