import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
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

        {/* Desktop navigation */}
        <nav className="header__nav">
          <a href="#features" className="header__link">Características</a>
          <a href="#how-it-works" className="header__link">Cómo Funciona</a>
          <a href="#pricing" className="header__link">Precios</a>
        </nav>

        <div className="header__actions">
          <button className="header__login-btn">Iniciar Sesión</button>
          <button className="header__register-btn">Registrarse</button>
        </div>

        {/* Mobile menu button */}
        <button className="header__mobile-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="header__mobile-menu">
          <nav className="header__mobile-nav">
            <a href="#features" className="header__mobile-link">Características</a>
            <a href="#how-it-works" className="header__mobile-link">Cómo Funciona</a>
            <a href="#pricing" className="header__mobile-link">Precios</a>
            <div className="header__mobile-actions">
              <button className="header__mobile-login">Iniciar Sesión</button>
              <button className="header__mobile-register">Registrarse</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
