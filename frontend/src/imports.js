import Home from "./Inicio/Home";
import Header from "./Navegadores/Header/Header";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from "./Navegadores/Footer/Footer";
import React from 'react';
import Ayuda from "./Contenido/Ayuda/Ayuda";
import Niveles from "./Contenido/Tipos/Niveles";
import ListaPreguntas from "./Contenido/ListaPregunta/ListaPreguntas";
import CrearPreguntas from "./Preguntas/CrearPreguntas/CrearPreguntas";
import EditarPreguntas from "./Preguntas/EditarPreguntar/EditarPreguntas";
import VerPreguntas from "./Preguntas/VerPreguntas/VerPreguntas";
import VerUsuario from "./Administrador/VerUsuario/VerUsuario";
import EditarUsuario from "./Administrador/EditarUsuario/EditarUsuario";
import CrearUsuario from "./Administrador/CrearUsuario/CrearUsuario";
import VistaAdministrador from "./Vistas/VistaAdministrador";
import VistaProfesor from "./Vistas/VistaProfesor";
import GestionUsuario from "./Administrador/GestionUsuario/GestionUsuario";
export {
    Home,Header, Router, Routes, Route, Navigate,Footer,React,Ayuda,Niveles,ListaPreguntas,CrearPreguntas,
    EditarPreguntas,VerPreguntas,VerUsuario,EditarUsuario,CrearUsuario,VistaAdministrador,
    VistaProfesor,GestionUsuario
  };