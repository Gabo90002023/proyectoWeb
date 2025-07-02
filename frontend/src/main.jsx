import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AppAdmin from "./AppAdmin.jsx";
import "./index.css";

import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

import Navbar from "./components/layout/Navbar.jsx";
import Inicio from "./pages/inicio/Inicio.jsx";

import { PrivateRoute, AdminRoute } from "./components/PrivateRoute";
import App from "./App.jsx";
import Footer from "./components/layout/Footer.jsx";
import ScrollToTop from "./components/common/ScrollToTop";

const MainRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Página de login principal */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/registrar" element={<Register />} />
      </Route>

      <Route
        path="/app/*"
        element={
          <AdminRoute>
            <AppAdmin />
          </AdminRoute>
        }
      />
      <Route
        path="/user/*"
        element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const LandingPage = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const userRole = localStorage.getItem("userRole");

  if (isAuthenticated) {
    if (userRole === "admin") {
      return <Navigate to="/app" replace />;
    } else {
      return <Navigate to="/user" replace />;
    }
  }

  return (
    <>
      <Inicio />
      <Footer />
    </>
  );
};

const Layout = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return (
    <>
      {!isAuthenticated && <Navbar />}
      <Outlet />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <MainRouter />
    </BrowserRouter>
  </React.StrictMode>
);
