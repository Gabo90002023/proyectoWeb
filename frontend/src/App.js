import './App.css';
import { 
  Home, Header, Footer, Ayuda, Niveles, ListaPreguntas,
  VerPreguntas, VerUsuario, EditarUsuario, CrearUsuario,VistaAdministrador,
   VistaProfesor,GestionUsuario,Editor,ElementoPanel,Secuencia
  
} from './imports';

import { Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <div>
      <Header />

      <Routes>           
        <Route path='/' element={<Home />} />
        <Route path='/Niveles' element={<Niveles />} />
        <Route path='/ListaPreguntas' element={<ListaPreguntas />} />
        <Route path='/Ayuda' element={<Ayuda />} />
        <Route path='/EditarPregunta' element={<Editor />} />
          <Route path='/EditarPanel' element={<ElementoPanel />} />
          <Route path='/Secuencia' element={<Secuencia />} />
        <Route path='/ViewPreguntas' element={<VerPreguntas />} />
        <Route path='/ViewUsuario' element={<VerUsuario />} /> 
        <Route path='/EditarUsuario' element={<EditarUsuario />} />
        <Route path='/CrearUsuario' element={<CrearUsuario />} /> 
        <Route path='/VerAdmi' element={<VistaAdministrador />} /> 
        <Route path='/VerProfesor' element={<VistaProfesor />} /> 
        <Route path='/GesUsuario' element={<GestionUsuario />} /> 

      </Routes>
      <Footer />
    </div>
  );
}

export default App;