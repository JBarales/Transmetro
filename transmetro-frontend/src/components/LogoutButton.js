import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: 'white',
        color: '#0a8754',
        border: '2px solid #0a8754',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '1.5rem'
      }}
    >
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
