import React, { useState } from "react"

import './Home.css';
//import { NavLink } from 'react-router-dom';
import { Users, BookOpen, Award } from "lucide-react"

const Home = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleAuth = () => {
    if (userType === "Administrador") {      
      window.location.href = "/VerAdmi"
    }
    else if (userType === "Profesor"){
      window.location.href = "/VerPro"
    }
    else if (userType === "Estudiante") {
      window.location.href = "/VerEst"
    }
  }
  return (
    
    <div className="main-container">
      <main className="main">
        <div className="main-grid">
          <div className="hero">
            <p className="hero-title">
              Plataforma de <span className="blue">Pensamiento</span> <br />
              <span className="yellow">Computacional</span>
            </p>
            <p className="hero-desc">
              Desarrolla habilidades de programación y lógica computacional a través de desafíos interactivos.
            </p>
            <div className="hero-features">
              <div><Users className="icon green" />3 tipos de usuarios</div>
              <div><BookOpen className="icon green" />Editor dinámico</div>
              <div><Award className="icon green" />Múltiples niveles</div>
            </div>
          </div>

          <div className="auth-card">
            <h3>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h3>
            <p>Accede a tu cuenta para comenzar</p>

            <label>Tipo de Usuario</label>
            <select value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="">Selecciona tu rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Profesor">Profesor</option>
              <option value="Estudiante">Estudiante</option>
            </select>

            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" />

            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />

            <button onClick={handleAuth}>{isLogin ? "Iniciar Sesión" : "Registrarse"}</button>

            <p className="switch-auth">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
              <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? " Regístrate" : " Inicia sesión"}</span>
            </p>
          </div>
        </div>

        <section id="features" className="features">
          <h3>Características Principales</h3>
          <div className="features-grid">
            <div className="card">
              <h4 className="blue">Editor Dinámico</h4>
              <p>Los profesores pueden crear preguntas interactivas con contenido multimedia.</p>
            </div>
            <div className="card">
              <h4 className="yellow">Múltiples Categorías</h4>
              <p>Contenido adaptado para edades de 3 a 18 años.</p>
            </div>
            <div className="card">
              <h4 className="green">Pensamiento Computacional</h4>
              <p>Desarrolla habilidades de resolución de problemas, algoritmos y lógica.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home