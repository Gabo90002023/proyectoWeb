import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/inicio/Inicio";
import VistaProfesor from "../pages/user/VistaProfesor";
import EditorVO from "../pages/user/EditorVO";
import SequenceEditor from "../pages/user/EditorPregunta/SequenceEditor";


const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas para el área de usuario autenticado */}
      <Route path="" element={<Inicio />} />
      <Route path="inicio" element={<Inicio />} />
      <Route path="/" element={<Inicio />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/preguntas" element={<EditorVO/>} />
      <Route path="verPro" element={<VistaProfesor />} />
      <Route path="/editor" element={<SequenceEditor />} />

      
    </Routes>
  );
};

export default AppRouter;
