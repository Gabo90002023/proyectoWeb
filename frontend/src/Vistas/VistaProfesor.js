import React from 'react';
import { Plus, BookOpen, BarChart3, LogOut } from 'lucide-react';

import './VistaProfesor.css'; 
const VistaProfesor = () => {
  

  const renderCard = (icon, title, description, content, color) => (
    <div className="card">
      <div className="card-header">
        <h3 className={`card-title ${color}`}>{icon} {title}</h3>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-content">{content}</div>
    </div>
  );
  const newQuestion = () => {
         
      window.location.href = "/CrearPregunta"
   
  }
  

  return (

    <div className="dashboard-pro">
      <header className="header-pro">
        <div className="container-pro">
          <div className="user-info">
            <span className={`badge outline`}>Profesor</span>
            <button className="logout" >
              <LogOut className="icon-small" />
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="container-pro2">
        <h2 className="welcome-title">
          Bienvenido, profesor
        </h2>
        <p className="welcome-subtitle">          
            Crea y gestiona desafíos de pensamiento computacional
        </p>

      <div className="grid">
      {renderCard(<Plus />, 'Crear Pregunta', 'Editor dinámico de preguntas',
        <button  className="btn blue" onClick={newQuestion}>Nuevo Desafío</button>, 'blue')}
      {renderCard(<BookOpen />, 'Mis Preguntas', 'Gestionar contenido creado',
        <>
          <p>Publicadas: 12</p>
          <p>Borradores: 3</p>
          <button  className="btn yellow">Ver Todas</button>
        </>, 'yellow')}
      {renderCard(<BarChart3 />, 'Resultados', 'Estadísticas de estudiantes',
        <button className="btn green">Ver Estadísticas</button>, 'green')}
    </div>
      </main>
    </div>
      )
}

export default VistaProfesor