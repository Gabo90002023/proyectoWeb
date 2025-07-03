import "../../styles/Footer.css";
import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-text">B</span>
              </div>
              <span className="footer-title">
                Blue<span className="footer-title-highlight">Quizz</span>
              </span>
            </div>
            <p className="footer-description">
              Crea quizzes interactivos en minutos, compártelos con el mundo.
            </p>
          </div>

          <div>
            <h3 className="footer-heading">Recursos</h3>
            <ul className="footer-list">
              <li><a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Documentación</a></li>
              <li><a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Comunidad</a></li>
              <li><a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Ayuda</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Empresa</h3>
            <ul className="footer-list">
              <li><a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Sobre Nosotros</a></li>
              <li><a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Contacto</a></li>
              <li><a href="/" onClick={(e) => e.preventDefault()} className="footer-link">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © {new Date().getFullYear()} BlueQuizz. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
