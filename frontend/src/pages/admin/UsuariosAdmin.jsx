import React, { useEffect, useState } from 'react';
import {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../../services/usuarioService';
import '../../styles/UsuariosAdmin.css';

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ full_name: '', email: '', password: '' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await actualizarUsuario(editandoId, form);
      } else {
        await crearUsuario(form);
      }
      setForm({ full_name: '', email: '', password: '' });
      setEditandoId(null);
      cargarUsuarios();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleEditar = (usuario) => {
    setForm({ full_name: usuario.full_name, email: usuario.email, password: '' });
    setEditandoId(usuario.id);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      await eliminarUsuario(id);
      cargarUsuarios();
    }
  };

  return (
    <div className="usuarios-admin-container">
      <h2>Gestión de Profesores</h2>

      <form onSubmit={handleSubmit} className="form-usuario">
        <input
          type="text"
          placeholder="Nombre completo"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        {!editandoId && (
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        )}

        <button type="submit">{editandoId ? 'Actualizar' : 'Crear'}</button>

        {editandoId && (
          <button
            type="button"
            onClick={() => {
              setEditandoId(null);
              setForm({ full_name: '', email: '', password: '' });
            }}
            className="btn-cancelar"
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="lista-usuarios">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.full_name}</td>
                <td>{usuario.email}</td>
                <td>
                  <button onClick={() => handleEditar(usuario)}>Editar</button>
                  <button onClick={() => handleEliminar(usuario.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosAdmin;
