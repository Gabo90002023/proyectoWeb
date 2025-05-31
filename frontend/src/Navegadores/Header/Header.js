import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <div className="header__logo">
            <span className="header__logo-text">B</span>
          </div>
          <span className="header__title">
            Blue<span className="header__title-highlight">Quizz</span>
          </span>
        </div>

        
        <nav className="header__nav">
          <NavLink to="/" className="header__link">
              Inicio
          </NavLink>
          <NavLink to="./ListaPreguntas" className="header__link">
              Lista de Preguntas
          </NavLink>
          <NavLink to="./Ayuda" className="header__link">
              Como Funciona
          </NavLink>
          <NavLink to="./Niveles" className="header__link">
              Niveles
          </NavLink>
          
        </nav>

        {/* Mobile menu button */}
        <button className="header__mobile-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="header__mobile-menu">
          <nav className="header__mobile-nav">
             <NavLink to="/" className="header__link">
              Inicio
          </NavLink>
          <NavLink to="./ListaPreguntas" className="header__link">
              Lista de Preguntas
          </NavLink>
          <NavLink to="./Ayuda" className="header__link">
              Como Funciona
          </NavLink>
          <NavLink to="./Niveles" className="header__link">
              Niveles
          </NavLink>            
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
