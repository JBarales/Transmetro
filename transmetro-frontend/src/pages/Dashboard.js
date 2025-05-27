import React from 'react';

function Dashboard() {
  const rol = localStorage.getItem('rol');
  const nombre = localStorage.getItem('nombre');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bienvenido, {nombre}</h2>
      <p>Este es tu panel de usuario con rol: <strong>{rol}</strong></p>
    </div>
  );
}

export default Dashboard;
