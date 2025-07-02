import React from 'react'
import { Users, BarChart3, Settings,LogOut } from 'lucide-react';

import './VistaAdministrador.css'; 
const VistaAdministrador = () => {
  const renderCard = (icon, title, description, content, color) => (
    <div className="card">
      <div className="card-header">
        <h3 className={`card-title ${color}`}>{icon} {title}</h3>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-content">{content}</div>
    </div>
  );
  const irGestion = () => {    
      window.location.href = "/GesUsuario"
   
  }
  return (
    <div className="dashboard-admi">
      <header className="header-admi">
        <div className="container-admi">
          <div className="user-info">
            <span className={`badge outline`}>Administrador</span>
            <button className="logout" >
              <LogOut className="icon-small" />
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="container-admi2">
        <h2 className="welcome-title">
          Bienvenido, Administrador
        </h2>
        <p className="welcome-subtitle">          
            Gestiona la plataforma y supervisa el contenido
        </p>

      <div className="grid">
      {renderCard(<Users />, 'Gestión de Usuarios', 'Administrar profesores y estudiantes',
        <>
          <p>Profesores: 25</p>
          <p>Estudiantes: 340</p>
          <button className="btn blue" onClick={irGestion}>Gestionar</button>
        </>, 'blue')}
      {renderCard(<BarChart3 />, 'Estadísticas', 'Métricas de la plataforma',
        <>
          <p>Preguntas: 156</p>
          <p>Respuestas: 2,340</p>
          <button className="btn yellow">Ver Reportes</button>
        </>, 'yellow')}
      {renderCard(<Settings />, 'Configuración', 'Ajustes del sistema',
        <button className="btn green">Configurar</button>, 'green')}
    </div>
      </main>
    </div>
 )
   
}

export default VistaAdministrador