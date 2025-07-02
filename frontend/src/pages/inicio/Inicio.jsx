import "../../styles/Inicio.css";
import React, { useState, useEffect } from "react";
import { Users, BookOpen, Award } from "lucide-react";
import { loginUser, registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password, nombre, passwordConfirmation } = formData;
    const newErrors = {};

    if (!email) newErrors.email = "El correo electrónico es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Correo no válido";

    if (!password) newErrors.password = "La contraseña es obligatoria";

    if (!isLogin) {
      if (!nombre) newErrors.nombre = "El nombre es obligatorio";
      if (!passwordConfirmation)
        newErrors.passwordConfirmation = "Confirma tu contraseña";
      else if (password !== passwordConfirmation)
        newErrors.passwordConfirmation = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setSuccess("");

    try {
      let response;

      if (isLogin) {
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        if (remember) localStorage.setItem("userEmail", formData.email);
        else localStorage.removeItem("userEmail");
      } else {
        response = await registerUser({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.passwordConfirmation,
        });
      }

      const role = response.user.role.toLowerCase();
      navigate(role === "admin" ? "/app" : "/user/preguntas");
    } catch (error) {
      setErrors({ general: error.message || "Error en autenticación" });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleAuth();
  }
};

  return (
    <div className="main-container">
      <main className="main">
        <div className="main-grid">
          {/* Sección izquierda: presentación */}
          <div className="hero">
            <p className="hero-title">
              Plataforma de <span className="blue">Pensamiento</span><br />
              <span className="yellow">Computacional</span>
            </p>
            <p className="hero-desc">
              Desarrolla habilidades de programación y lógica computacional a través de desafíos interactivos.
            </p>
            <div className="hero-features">
              <div><Users className="icon green" /> 3 tipos de usuarios</div>
              <div><BookOpen className="icon green" /> Editor dinámico</div>
              <div><Award className="icon green" /> Múltiples niveles</div>
            </div>
          </div>

          {/* Sección derecha: formulario */}
          <div className="auth-card">
            <h3>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h3>
            <p>{isLogin ? "Accede a tu cuenta para comenzar" : "Crea una cuenta para comenzar"}</p>

            {errors.general && <div className="error-message">{errors.general}</div>}
            {success && <div className="success-message">{success}</div>}

            {!isLogin && (
              <>
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  onKeyDown={handleKeyDown}
                />
                {errors.nombre && <div className="error-message">{errors.nombre}</div>}
              </>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              onKeyDown={handleKeyDown}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              onKeyDown={handleKeyDown}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}

            {!isLogin && (
              <>
                <label htmlFor="passwordConfirmation">Confirmar Contraseña</label>
                <input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  placeholder="••••••••"
                  onKeyDown={handleKeyDown}
                />
                {errors.passwordConfirmation && <div className="error-message">{errors.passwordConfirmation}</div>}
              </>
            )}

            <div className="auth-checkbox">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember">Recordarme</label>
            </div>

            <button onClick={handleAuth} disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  <span>{isLogin ? "Iniciando sesión..." : "Registrando..."}</span>
                </>
              ) : (
                isLogin ? "Iniciar Sesión" : "Registrarse"
              )}
            </button>

            <p className="switch-auth">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
              <span
                className="auth-switch"
                onClick={() => setIsLogin(!isLogin)}
                tabIndex={0}
                role="button"
              >
                {isLogin ? " Regístrate" : " Inicia sesión"}
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inicio;
