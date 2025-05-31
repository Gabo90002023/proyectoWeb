import './App.css';
import { 
  Home, Header, Footer, Ayuda, Niveles, ListaPreguntas, CrearPreguntas,
  EditarPreguntas, VerPreguntas, VerUsuario, EditarUsuario, CrearUsuario,VistaAdministrador,
  VistaEstudiante, VistaProfesor
  
} from './imports';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />

      <Routes>           
        <Route path='/' element={<Home />} />
        <Route path='/CrearPregunta' element={<CrearPreguntas />} />
        <Route path='/Niveles' element={<Niveles />} />
        <Route path='/ListaPreguntas' element={<ListaPreguntas />} />
        <Route path='/Ayuda' element={<Ayuda />} />
        <Route path='/EditarPreguntas' element={<EditarPreguntas />} />
        <Route path='/ViewPreguntas' element={<VerPreguntas />} />
        <Route path='/ViewUsuario' element={<VerUsuario />} /> 
        <Route path='/EditarUsuario' element={<EditarUsuario />} />
        <Route path='/CrearUsuario' element={<CrearUsuario />} /> 
        <Route path='/VerAdmi' element={<VistaAdministrador />} /> 
        <Route path='/VerEst' element={<VistaEstudiante />} /> 
        <Route path='/VerPro' element={<VistaProfesor />} /> 

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
