
import { Routes, Route } from "react-router-dom";
import UsuariosAdmin from "../pages/admin/UsuariosAdmin"

const AppRouterAdmin = () => {
  return ( 
    <Routes>
      <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
    </Routes>
  );
};

export default AppRouterAdmin;
