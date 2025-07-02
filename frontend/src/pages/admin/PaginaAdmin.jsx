import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

import VistaAdministrador from './VistaAdministrador';
import UsuariosAdmin from './UsuariosAdmin'; // nueva página admin

const PaginaAdmin = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<VistaAdministrador />} />
          <Route path="/usuarios" element={<UsuariosAdmin />} />
          {/* Puedes agregar más rutas aquí si lo necesitas */}
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default PaginaAdmin;
