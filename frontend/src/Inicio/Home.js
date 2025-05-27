import React from 'react'
import './Home.css';
import { NavLink } from 'react-router-dom';

const Home = () => {

  return (
    <div>
      
    <section className="hero-section">
      <div className="hero-bg-left"></div>
      <div className="hero-bg-right"></div>

      <div className="container">
        <div className="hero-grid">
          <div className="hero-left">
            <h1 className="hero-title">
              Crea quizzes <span className="hero-highlight">interactivos</span> en minutos
            </h1>
            <p className="hero-subtitle">
              BlueQuizz te permite crear, compartir y analizar cuestionarios interactivos para educación, marketing o entretenimiento.
            </p>
            <div className="hero-buttons">
              <NavLink to="/ViewPreguntas" className="btn-primary">
                Comenzar
              </NavLink>
              
            </div>
            
          </div>

          <div className="hero-right">
            <div className="quiz-card-wrapper">
              <div className="quiz-card">
                <div className="quiz-header">
                  <h3>Quiz: Conocimientos Generales</h3>
                  <span className="quiz-live">En vivo</span>
                </div>
                <div className="quiz-question">
                  <p className="question">¿Cuál es la capital de Francia?</p>
                  <div className="answers">
                    {['Londres', 'París', 'Berlín', 'Madrid'].map((option, idx) => (
                      <button key={idx} className={option === 'París' ? 'answer correct' : 'answer'}>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="quiz-footer">
                  <span>2/10 preguntas</span>
                  <button className="quiz-next">Siguiente</button>
                </div>
              </div>
            </div>
            <div className="quiz-glow-top"></div>
            <div className="quiz-glow-bottom"></div>
          </div>
        </div>
      </div>
    </section>
    </div>
    )
}

export default Home