import React, { useState, useEffect } from 'react';
import './GestionUsuario.css'; // Asegúrate de tener un CSS separado para estilos

// Iconos simulados (puedes reemplazar con react-icons o lucide-react)
const Icons = {
  Brain: () => <span className="icon">🧠</span>,
  ArrowLeft: () => <span className="icon">←</span>,
  Plus: () => <span className="icon">+</span>,
  Search: () => <span className="icon">🔍</span>,
  Filter: () => <span className="icon">⚙️</span>,
  Eye: () => <span className="icon">👁️</span>,
  Edit: () => <span className="icon">✏️</span>,
  UserCheck: () => <span className="icon">✅</span>,
  UserX: () => <span className="icon">❌</span>,
  Trash2: () => <span className="icon">🗑️</span>
};

// Datos de ejemplo de usuarios (solo administradores y profesores)
const sampleUsers = [
  {
    id: 1,
    name: "Ana García",
    email: "ana.garcia@email.com",
    userType: "teacher",
    isActive: true,
    createdAt: "2024-01-15",
    lastLogin: "2024-01-20",
    questionsCreated: 12,
    studentsCount: 45,
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    userType: "admin",
    isActive: true,
    createdAt: "2024-01-18",
    lastLogin: "2024-01-21",
    questionsCreated: 28,
    studentsCount: 0,
  },
  {
    id: 3,
    name: "María López",
    email: "maria.lopez@email.com",
    userType: "teacher",
    isActive: false,
    createdAt: "2024-01-10",
    lastLogin: "2024-01-19",
    questionsCreated: 8,
    studentsCount: 32,
  },
  {
    id: 4,
    name: "Pedro Ramírez",
    email: "pedro.ramirez@email.com",
    userType: "admin",
    isActive: true,
    createdAt: "2024-01-20",
    lastLogin: "2024-01-21",
    questionsCreated: 15,
    studentsCount: 0,
  },
  {
    id: 5,
    name: "Sofia Chen",
    email: "sofia.chen@email.com",
    userType: "teacher",
    isActive: true,
    createdAt: "2024-01-12",
    lastLogin: "2024-01-21",
    questionsCreated: 42,
    studentsCount: 67,
  },
];

const GestionUsuario = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [filteredUsers, setFilteredUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    userType: "teacher",
    password: "",
  });

  useEffect(() => {
    let filtered = users;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por tipo
    if (filterType !== "all") {
      filtered = filtered.filter((user) => user.userType === filterType);
    }

    // Filtrar por estado
    if (filterStatus !== "all") {
      filtered = filtered.filter((user) => user.isActive === (filterStatus === "active"));
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterType, filterStatus]);

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const user = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      ...newUser,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: null,
      questionsCreated: 0,
      studentsCount: 0,
    };
    setUsers([...users, user]);
    setNewUser({ name: "", email: "", userType: "teacher", password: "" });
    setIsCreateDialogOpen(false);
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map((user) => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const getUserTypeColor = (type) => {
    switch (type) {
      case "admin":
        return "badge-admin";
      case "teacher":
        return "badge-teacher";
      default:
        return "badge-default";
    }
  };

  const getStatusColor = (isActive) => {
    return isActive ? "badge-active" : "badge-inactive";
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setFilterStatus("all");
  };

  const goToDashboard = () => {
    // Aquí puedes implementar la navegación al dashboard
    // Por ejemplo: navigate('/dashboard') si usas React Router
    window.history.back();
  };

  return (
    <div className="users-management">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <button onClick={goToDashboard} className="btn btn-outline btn-sm">
              <Icons.ArrowLeft />
              Dashboard
            </button>
            <div className="header-title">
              <Icons.Brain />
              <h1>Gestión de Usuarios</h1>
            </div>
          </div>
          <button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="btn btn-primary"
          >
            <Icons.Plus />
            Nuevo Usuario
          </button>
        </div>
      </header>

      <main className="main-container">
        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number blue">{users.length}</div>
            <div className="stat-label">Total Usuarios</div>
          </div>
          <div className="stat-card">
            <div className="stat-number green">
              {users.filter((u) => u.userType === "teacher").length}
            </div>
            <div className="stat-label">Profesores</div>
          </div>
          <div className="stat-card">
            <div className="stat-number red">
              {users.filter((u) => u.userType === "admin").length}
            </div>
            <div className="stat-label">Administradores</div>
          </div>
          <div className="stat-card">
            <div className="stat-number green">
              {users.filter((u) => u.isActive).length}
            </div>
            <div className="stat-label">Activos</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Icons.Filter />
              Filtros y Búsqueda
            </h3>
          </div>
          <div className="card-content">
            <div className="filters-grid">
              <div className="search-container">
                <Icons.Search />
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="select-input"
              >
                <option value="all">Todos los tipos</option>
                <option value="admin">Administradores</option>
                <option value="teacher">Profesores</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="select-input"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
              <button onClick={clearFilters} className="btn btn-outline">
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Lista de Usuarios</h3>
            <p className="card-description">Gestiona todos los usuarios de la plataforma</p>
          </div>
          <div className="card-content">
            <div className="table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info">
                          <p className="user-name">{user.name}</p>
                          <p className="user-email">{user.email}</p>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${getUserTypeColor(user.userType)}`}>
                          {user.userType === "admin" ? "Administrador" : "Profesor"}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusColor(user.isActive)}`}>
                          {user.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      
                      <td>
                        <div className="actions">
                          <button className="btn-icon btn-view" title="Ver">
                            <Icons.Eye />
                          </button>
                          <button className="btn-icon btn-edit" title="Editar">
                            <Icons.Edit />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user.id)}
                            className={`btn-icon ${user.isActive ? 'btn-deactivate' : 'btn-activate'}`}
                            title={user.isActive ? "Desactivar" : "Activar"}
                          >
                            {user.isActive ? <Icons.UserX /> : <Icons.UserCheck />}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="btn-icon btn-delete"
                            title="Eliminar"
                          >
                            <Icons.Trash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Create User Dialog */}
      {isCreateDialogOpen && (
        <div className="dialog-overlay" onClick={() => setIsCreateDialogOpen(false)}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>Crear Nuevo Usuario</h3>
              <p>Completa la información para crear un nuevo usuario</p>
            </div>
            <div className="dialog-body">
              <div className="form-group">
                <label htmlFor="name">Nombre Completo</label>
                <input
                  id="name"
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Nombre del usuario"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="email@ejemplo.com"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="userType">Tipo de Usuario</label>
                <select
                  id="userType"
                  value={newUser.userType}
                  onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
                  className="form-input"
                >
                  <option value="teacher">Profesor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>
            </div>
            <div className="dialog-footer">
              <button
                onClick={() => setIsCreateDialogOpen(false)}
                className="btn btn-outline"
              >
                Cancelar
              </button>
              <button onClick={handleCreateUser} className="btn btn-success">
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuario;