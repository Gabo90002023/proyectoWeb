import React, { useEffect, useState } from 'react';
import { Users, BarChart3, Settings, LogOut } from 'lucide-react';
import '../../styles/VistaAdministrador.css'; 
import { useNavigate } from 'react-router-dom';
import { obtenerCantidadProfesores, obtenerCantidadPreguntas } from '../../services/adminService';

const VistaAdministrador = () => {
  const [profesores, setProfesores] = useState(0);
  const [preguntas, setPreguntas] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const totalProfesores = await obtenerCantidadProfesores();
      const totalPreguntas = await obtenerCantidadPreguntas();
      setProfesores(totalProfesores);
      setPreguntas(totalPreguntas);
    };
    fetchData();
  }, []);

  const renderCard = (icon, title, description, content, color) => (
    <div className="card">
      <div className="card-header">
        <h3 className={`card-title ${color}`}>{icon} {title}</h3>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-content">{content}</div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole"); // si usas roles
    navigate("/"); // redirige al inicio o login
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="container">
          <div className="user-info">
            <span className={`badge outline`}>Administrador</span>
            <button className="logout" onClick={handleLogout}>
              <LogOut className="icon-small" />
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="container">
        <h2 className="welcome-title">Bienvenido, Administrador</h2>
        <p className="welcome-subtitle">Gestiona la plataforma y supervisa el contenido</p>

        <div className="grid">
          {renderCard(<Users />, 'Gestión de Usuarios', 'Administrar profesores',
            <>
              <p>Profesores: {profesores}</p>
              <button className="btn blue" onClick={() => navigate('/app/usuarios')}>
                Gestionar
               </button>
            </>, 'blue')}

          {renderCard(<BarChart3 />, 'Estadísticas', 'Métricas de la plataforma',
            <>
              <p>Preguntas: {preguntas}</p>
              <button className="btn yellow">Ver Reportes</button>
            </>, 'yellow')}

          {renderCard(<Settings />, 'Configuración', 'Ajustes del sistema',
            <button className="btn green">Configurar</button>, 'green')}
        </div>
      </main>
    </div>
  );
};

export default VistaAdministrador;
