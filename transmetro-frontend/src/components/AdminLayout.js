import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function AdminLayout() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  const rol = localStorage.getItem('rol');
  if (rol !== 'admin') return null;

  return (
     <>
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/admin">Inicio</Link>
        <Link to="/admin/empleados">Empleados</Link>
        <Link to="/admin/lineas">Líneas</Link>
        <Link to="/admin/estaciones">Estaciones</Link>
        <Link to="/admin/buses">Buses</Link>
        <Link to="/admin/parqueos">Parqueos</Link>
        <Link to="/admin/municipalidades">Municipalidades</Link>
        <Link to="/admin/reportes">Reportes</Link>
      </div>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </nav>

    <div style={{ padding: '1.5rem' }}>
      <Outlet />
    </div>
  </>
  );
}

export default AdminLayout;
