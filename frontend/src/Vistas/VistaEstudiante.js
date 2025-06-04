import React from 'react'
import './VistaEstudiante.css'; 
import { LogOut } from 'lucide-react';


const VistaEstudiante = () => {
  return (
     <div className="dashboard">
      <header className="header">
        <div className="container">
          <div className="user-info">
            <span className={`badge outline`}>Estudiante</span>
            <button className="logout" >
              <LogOut className="icon-small" />
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="container">
        <h2 className="welcome-title">
          Bienvenido, estudiante
        </h2>
        <p className="welcome-subtitle">          
            Explora y resuelve desafíos de programación
        </p>
       <div className="grid">
        {[
          { age: '3-6 años', color: 'blue', challenges: 9 },
          { age: '7-10 años', color: 'yellow', challenges: 12 },
          { age: '11-14 años', color: 'green', challenges: 15 },
          { age: '15-18 años', color: 'red', challenges: 18 }
        ].map((category) => (
          <div key={category.age} className="card">
            <div className="card-header">
              <h3>{category.age}</h3>
              <span className={`badge ${category.color}`}>{category.challenges} desafíos</span>
            </div>
            <div className="card-content">
              <button
                className="btn blue"
              >
                Comenzar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header">
          <h3>Mi Progreso</h3>
        </div>
        <div className="card-content progress">
          <div>
            <p className="value blue">24</p>
            <p>Completados</p>
          </div>
          <div>
            <p className="value yellow">85%</p>
            <p>Precisión</p>
          </div>
          <div>
            <p className="value green">12</p>
            <p>Nivel Actual</p>
          </div>
        </div>
      </div>
      </main>
    </div>

   
   
      )
}

export default VistaEstudiante