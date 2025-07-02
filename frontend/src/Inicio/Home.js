import React, { useState } from "react"
import './Home.css'
import { Users, BookOpen, Award } from "lucide-react"
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Home = () => {
  const [login, setLogin] = useState(true)
  const [register, setRegister] = useState(false)
  const [userType, setUserType] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmailValido, setErrorEmailValido] = useState("")
  const [errorContraseñaValido, setErrorContraseñaValido] = useState("")
  const [errorNombre, setErrorNombre] = useState("")
  const [errorApellido, setErrorApellido] = useState("")
  const [errorCorreo, setErrorCorreo] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorImcompleto, setErrorIncompleto] = useState("")
  
   const verContraseña = () => {
    setShowPassword(!showPassword);
  };

  const iniciarSesion = () => {
  if (!email || !password) {
    setErrorIncompleto("Por favor, complete todos los campos");
    return;
  }

  fetch("http://127.0.0.1:8000/api/verificar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.exists === false) {
        setErrorEmailValido("Correo no registrado");
      } else if (data.correcta === false) {
        setErrorContraseñaValido("Contraseña incorrecta");
      } else {
        // Guardar datos en localStorage
        localStorage.setItem("user", data.nombre);
        localStorage.setItem("email", email);
        localStorage.setItem("role", data.rol);
        localStorage.setItem("id", data.id);

        // Redirigir según el rol
        if (data.rol === "Administrador") {
          window.location.href = "/VerAdmi";
        } else if (data.rol === "Profesor") {
          window.location.href = "/VerProfesor";
        } else {
          window.location.href = "/"; 
        }
      }
    })
    .catch((error) => {
      console.error("Error en la autenticación:", error);
      alert("No se pudo conectar al servidor");
    });
};

  

  const handleRegister = () => {
    setLogin(false)
    setRegister(true)
    setUserType("")
    setNombre("")
    setApellido("")
    setEmail("")
    setPassword("")
  }

  const handleLogin = () => {
    setRegister(false)
    setLogin(true)
    setUserType("")
    setNombre("")
    setApellido("")
    setEmail("")
    setPassword("")
    setErrorApellido("")
    setErrorNombre("")
    setErrorCorreo("")
    setErrorPassword("")
    setErrorIncompleto("")
  }
  const handleSubmitRegistro = (e) => {
    e.preventDefault();

    if (!email || !password || !nombre || !apellido) {
        setErrorIncompleto("Por favor, complete todos los campos");
        return;
    } else {
        setErrorCorreo("");
        setErrorPassword("");
        setErrorIncompleto("");
        
    }

    const caracteresEspeciales = /[!#$%^&*()_+\-{};':"|,<>?]+/;

    if (email.length > 30) {
        setErrorCorreo("Su correo no debe exceder los 30 caracteres");
        return;
    } else {
        setErrorCorreo("");
    }

    if (caracteresEspeciales.test(email)) {
        setErrorCorreo("Su correo debe contener caracteres especiales, excepto @");
        return;
    } else {
        setErrorCorreo("");
    }

    if (!email.includes('@')) {
        setErrorCorreo("Su correo debe contener @");
        return;
    } else {
        setErrorCorreo("");
    }

    if (caracteresEspeciales.test(password)) {
        setErrorPassword("Su contraseña no debe contener caracteres especiales");
        return;
    } else {
        setErrorPassword("");
    }

    if (password.length > 20) {
        setErrorPassword("Su contraseña no debe exceder los 20 caracteres");
        return;
    } else {
        setErrorPassword("");
    }

    if (nombre.length > 20) {
        setErrorNombre("Su nombre no debe exceder los 20 caracteres");
        return;
    } else {
        setErrorNombre("");
    }

    if (apellido.length > 20) {
        setErrorApellido("Su apellido no debe exceder los 20 caracteres");
        return;
    } else {
        setErrorApellido("");
    }

    // Envío al servidor
    fetch("http://127.0.0.1:8000/api/instanciaUsuario", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        nombre: nombre,
        apellido: apellido,
        correo_electronico: email,
        contraseña: password,
        userType: userType,
    }),
  })

    .then((response) => {
        if (!response.ok) {
            throw new Error("Error al registrar el usuario");
        }
        return response.json();
    })
    .then((data) => {
        alert("¡Usuario registrado exitosamente!");
        console.log("Respuesta del servidor:", data);
        handleLogin(); // Vuelve al formulario de login
    })
    .catch((error) => {
        console.error("Error de red o registro:", error);
        alert("No se pudo registrar el usuario");
    });
  };

  return (
    <div className="main-container">
      {login && (
        <main className="main">
          <div className="main-grid">
            <div className="hero">
              <p className="hero-title">
                Plataforma de <span className="blue">Desarrollo</span> <br />
                <span className="yellow">Computacional</span>
              </p>
              <p className="hero-desc">
                Desarrolla preguntas interactivas de programación y lógica computacional.
              </p>
              <div className="hero-features">
                <div><Users className="icon green" />2 tipos de usuarios</div>
                <div><BookOpen className="icon green" />Editor dinámico</div>
                <div><Award className="icon green" />Múltiples niveles</div>
              </div>
            </div>

            <div className="auth-card">
              <h3>Iniciar Sesión</h3>
              <p>Accede a tu cuenta para comenzar</p>

              <label>Tipo de Usuario</label>
              <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                <option value="">Selecciona tu rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Profesor">Profesor</option>
              </select>

              <label>Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="tu@email.com" 
              />
              {errorEmailValido && <p className="error">{errorEmailValido}</p>}

              <label>Contraseña</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
              />
              <div className="verContra" type="button" onClick={verContraseña}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
              {errorContraseñaValido && <p className="error">{errorContraseñaValido}</p>}
              {errorImcompleto && <p className="error2">{errorImcompleto}</p>}                                                

              <button onClick={iniciarSesion}>Iniciar Sesión</button>

              <p className="switch-auth">
                ¿No tienes cuenta?
                <span onClick={handleRegister}> Regístrate</span>
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
                <p>Contenido se puede categorizar para edades de 3 a 18 años.</p>
              </div>
              <div className="card">
                <h4 className="green">Exportar tus preguntas</h4>
                <p>Desarrolla tus preguntas interactivas y imprímelas en PDF.</p>
              </div>
            </div>
          </section>
        </main>
      )}

      {register && (
        <div className="auth-card2">
          <h3>Registrarse</h3>
          <p>Crea tu nueva cuenta para comenzar</p>

          <label>Tipo de Usuario</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="">Selecciona tu rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Profesor">Profesor</option>
          </select>

          <label>Nombre</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="tu nombre" 
          />
          {errorNombre && <p className="error2">{errorNombre}</p>}
          <label>Apellido</label>
          <input 
            type="text" 
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)} 
            placeholder="tu apellido" 
          />
          {errorApellido && <p className="error2">{errorApellido}</p>}

          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="tu@email.com" 
          />
          {errorCorreo && <p className="error2">{errorCorreo}</p>}
          <label>Contraseña</label>
          <input 
            type={showPassword ? 'text' : 'password'} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
          />
          <div className="verContra2" type="button" onClick={verContraseña}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
          {errorPassword && <p className="error2">{errorPassword}</p>}
          {errorImcompleto && <p className="error2">{errorImcompleto}</p>}                                                

          <button onClick={handleSubmitRegistro}>Registrarse</button>

          <p className="switch-auth">
            ¿Ya tienes cuenta?
            <span onClick={handleLogin}> Inicia sesión</span>
          </p>
        </div>
      )}
    </div>
  )

}

export default Home
