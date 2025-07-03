import "../../styles/Navbar.css";
import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, LogOut} from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    setIsAuthenticated(!!token);
    setUserRole(role); // Guardamos el rol
  };

  checkAuth();
  window.addEventListener("storage", checkAuth);
  return () => window.removeEventListener("storage", checkAuth);
}, []);



  const toggleMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    navigate("/");
    closeMenu();
  };

  const renderLinks = () => (
  <>
    <NavLink to="/" className="header__link" onClick={closeMenu}>
      Inicio
    </NavLink>

    {isAuthenticated && userRole === "user" && (
      <NavLink to="/user/preguntas" className="header__link" onClick={closeMenu}>
        Lista de preguntas
      </NavLink>
    )}

    <button className="header__link">Como funciona</button>
    <button className="header__link">Contacto</button>
  </>
);

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo y Título */}
        <div className="header__brand" onClick={() => { navigate(isAuthenticated ? "/user/inicio" : "/"); closeMenu(); }}>
          <div className="header__logo"><span className="header__logo-text">B</span></div>
          <span className="header__title">Blue<span className="header__title-highlight">Quizz</span></span>
        </div>

        {/* Navegación Desktop */}
        <nav className="header__nav">
          {renderLinks()}
        </nav>

        {/* Botones de sesión Desktop */}
        <div className="header__session-buttons">
          {isAuthenticated ? (
            <button className="btn3 logout-btn" onClick={handleLogout}>
              <LogOut size={18} /> Cerrar Sesión
            </button>
          ) : (
            <>
              
            </>
          )}
        </div>

        {/* Botón Menú Mobile */}
        <button className="header__mobile-btn" onClick={toggleMenu}>
          {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Menú Mobile */}
      {mobileMenuOpen && (
        <div className="header__mobile-menu">
          <nav className="header__mobile-nav">
            {renderLinks()}
          </nav>
          <div className="header__mobile-session">
            {isAuthenticated ? (
              <button className="btn3 logout-btn" onClick={handleLogout}>
                <LogOut size={18} /> Cerrar Sesión
              </button>
            ) : (
              <>
                
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
