import React from 'react'
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';
import './Footer.css'; // Asegúrate de importar tu CSS separado

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
              <div className="footer-social">
                <a href="#" className="footer-social-link">
                  <FacebookIcon size={20} />
                </a>
                <a href="#" className="footer-social-link">
                  <TwitterIcon size={20} />
                </a>
                <a href="#" className="footer-social-link">
                  <InstagramIcon size={20} />
                </a>
                <a href="#" className="footer-social-link">
                  <YoutubeIcon size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="footer-heading">Producto</h3>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Características</a></li>
                <li><a href="#" className="footer-link">Precios</a></li>
                <li><a href="#" className="footer-link">Tutoriales</a></li>
                <li><a href="#" className="footer-link">Casos de Éxito</a></li>
              </ul>
            </div>
            <div>
              <h3 className="footer-heading">Recursos</h3>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Blog</a></li>
                <li><a href="#" className="footer-link">Documentación</a></li>
                <li><a href="#" className="footer-link">Comunidad</a></li>
                <li><a href="#" className="footer-link">Ayuda</a></li>
              </ul>
            </div>
            <div>
              <h3 className="footer-heading">Empresa</h3>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Sobre Nosotros</a></li>
                <li><a href="#" className="footer-link">Contacto</a></li>
                <li><a href="#" className="footer-link">Política de Privacidad</a></li>
                <li><a href="#" className="footer-link">Términos de Servicio</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-bottom-text">
              © {new Date().getFullYear()} BlueQuizz. Todos los derechos reservados.
            </p>
            <div className="footer-language-select">
              <select className="footer-select">
                <option>Español</option>
                <option>English</option>
                <option>Français</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer