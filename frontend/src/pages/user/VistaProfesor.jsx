import React, { useState, useEffect } from "react";
import { Plus, BookOpen, BarChart3, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"

import "../../styles/VistaProfesor.css";

const VistaProfesor = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    // Verifica autenticación
    if (!token || role !== "user") {
      navigate("/"); // Redirige al landing si no está logueado o no es profesor
    } else {
      setIsAuthenticated(true); // Está autenticado y es user
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
  };

  const renderCard = (icon, title, description, content, color) => (
    <div className="card">
      <div className="card-header">
        <h3 className={`card-title ${color}`}>{icon} {title}</h3>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-content">{content}</div>
    </div>
  );

  return (
    <div className="dashboard2">
      <header className="header2">
        <div className="container2">
          <div className="user-info2">
            <span className={`badge outline`}>Profesor</span>
            <button className="logout2" onClick={handleLogout}>
              <LogOut className="icon-small2" />
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="container">
        <h2 className="welcome-title">Bienvenido, profesor</h2>
        <p className="welcome-subtitle">Crea y gestiona desafíos de pensamiento computacional</p>

        <div className="grid">
          {renderCard(<Plus />, 'Crear Pregunta', 'Editor dinámico de preguntas',
            <button className="btn blue" onClick={() => navigate("user/editor")} >Nuevo Desafío</button>, 'blue')}
          {renderCard(<BookOpen />, 'Mis Preguntas', 'Gestionar contenido creado',
            <>
              <p>Publicadas: 12</p>
              <p>Borradores: 3</p>
              <button className="btn yellow" onClick={() => navigate("/user/preguntas")}>Ver Todas</button>
            </>, 'yellow')}
          {renderCard(<BarChart3 />, 'Resultados', 'Estadísticas de estudiantes',
            <button className="btn green">Ver Estadísticas</button>, 'green')}
        </div>
      </main>
    </div>
  );
};

export default VistaProfesor;
