import React, { useEffect, useState } from 'react';
import { getMiBus } from '../api/conductor';
import LogoutButton from '../components/LogoutButton';

function ConductorDashboard() {
  const [bus, setBus] = useState(null);
  const [error, setError] = useState('');
  const nombre = localStorage.getItem('nombre');

  useEffect(() => {
    getMiBus()
      .then(res => {
        setBus(res.data);
      })
      .catch(() => {
        setError('No tienes un bus asignado o hubo un error');
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '0.5rem', color: 'white' }}>Panel del Conductor</h2>
      <p style={{ color: 'white' }}>
        Bienvenido, <strong>{nombre}</strong>
      </p>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {bus ? (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          marginTop: '1.5rem',
          maxWidth: '600px'
        }}>
          <h3 style={{ color: '#0a8754', marginBottom: '1rem' }}>Información del Bus Asignado</h3>
          <p><strong>Placa:</strong> {bus.placa}</p>
          <p><strong>Capacidad:</strong> {bus.capacidad}</p>
          <p><strong>Línea:</strong> {bus.Linea?.nombre}</p>
          <p><strong>Parqueo:</strong> {bus.Parqueo?.nombre}</p>
          <p><strong>Dirección del Parqueo:</strong> {bus.Parqueo?.ubicacion}</p>
        </div>
      ) : !error ? (
        <p style={{ marginTop: '1rem' }}>Cargando datos del bus...</p>
      ) : null}

      <div style={{ marginTop: '1.5rem' }}>
        <LogoutButton />
      </div>
    </div>
  );
}

export default ConductorDashboard;
