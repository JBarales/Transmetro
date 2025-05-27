import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await login({ correo, password });
      const { token, usuario } = res.data;

      // Guarda en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('rol', usuario.rol); // admin, conductor, policia
      localStorage.setItem('nombre', usuario.nombre);

      // Redirige según el rol
      if (usuario.rol === 'admin') {
        navigate('/admin');
      } else if (usuario.rol === 'conductor') {
        navigate('/dashboard/conductor');
      } else if (usuario.rol === 'policia') {
        navigate('/dashboard/policia');
      } else {
        setError('Rol no reconocido');
      }
    } catch (err) {
      setError('Credenciales inválidas o error en el servidor');
    }
  };

  return (
    <div className="login-wrapper">
    <div className="login-container">
      <h2>Login Transmetro</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  </div>
  );
}

export default Login;
