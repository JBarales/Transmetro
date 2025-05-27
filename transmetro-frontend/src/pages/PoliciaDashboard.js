import React, { useEffect, useState } from 'react';
import { getMiEstacion } from '../api/policia';
import LogoutButton from '../components/LogoutButton';

function PoliciaDashboard() {
  const [estacion, setEstacion] = useState(null);
  const [error, setError] = useState('');
  const nombre = localStorage.getItem('nombre');

  useEffect(() => {
    getMiEstacion()
      .then(res => setEstacion(res.data))
      .catch(() => setError('No tienes estación asignada o hubo un error'));
  }, []);

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2 style={{ color: 'white' }}>Panel del Policía</h2>
      <p style={{ color: 'white' }}>
        Bienvenido, <strong>{nombre}</strong>
      </p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {estacion ? (
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          marginTop: '1rem',
          color: 'black' // 🔧 Texto interno negro
        }}>
          <h3 style={{ color: '#0a8754' }}>Información de la Estación Asignada</h3>
          <p><strong>Estación:</strong> {estacion.nombre}</p>
          <p><strong>Direccion:</strong> {estacion.ubicacion}</p>
          <p><strong>Municipalidad:</strong> {estacion.Municipalidad?.nombre}</p>
        </div>
      ) : !error ? (
        <p style={{ color: 'white' }}>Cargando estación asignada...</p>
      ) : null}

      <div style={{ marginTop: '1.5rem' }}>
        <LogoutButton />
      </div>
    </div>
  );
}

export default PoliciaDashboard;