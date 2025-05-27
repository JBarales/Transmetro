import React, { useEffect, useState } from 'react';
import {
  getParqueos,
  createParqueo,
  updateParqueo,
  deleteParqueo
} from '../api/parqueos';

function ParqueoDashboard() {
  const [parqueos, setParqueos] = useState([]);
  const [form, setForm] = useState({ nombre: '', ubicacion: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagina, setPagina] = useState(1);
  const parqueosPorPagina = 5;

  useEffect(() => {
    cargarParqueos();
  }, []);

  const cargarParqueos = async () => {
    const res = await getParqueos();
    setParqueos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editandoId) {
      await updateParqueo(editandoId, form);
    } else {
      await createParqueo(form);
    }
    setForm({ nombre: '', ubicacion: '' });
    setEditandoId(null);
    cargarParqueos();
  };

  const handleEdit = (parqueo) => {
    setForm({ nombre: parqueo.nombre, ubicacion: parqueo.ubicacion });
    setEditandoId(parqueo.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este parqueo?')) {
      await deleteParqueo(id);
      cargarParqueos();
    }
  };

  const parqueosFiltrados = parqueos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPaginas = Math.ceil(parqueosFiltrados.length / parqueosPorPagina);
  const parqueosPaginados = parqueosFiltrados.slice((pagina - 1) * parqueosPorPagina, pagina * parqueosPorPagina);

  return (
    <div className="admin-dashboard">
      <h2>Gestión de Parqueos</h2>

      <form onSubmit={handleSubmit} className="empleado-form">
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={form.ubicacion}
          onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
          required
        />
        <button className="btn-crear" type="submit">
          {editandoId ? 'Actualizar' : 'Agregar'}
        </button>
        {editandoId && (
          <button
            type="button"
            onClick={() => {
              setEditandoId(null);
              setForm({ nombre: '', ubicacion: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <input
        type="text"
        placeholder="Buscar por nombre o ubicación"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '300px', padding: '0.5rem', margin: '1rem 0' }}
      />

      <table className="tabla-empleados">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {parqueosPaginados.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.ubicacion}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPagina(i + 1)}
            style={{
              marginRight: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: pagina === i + 1 ? '#0a8754' : 'white',
              color: pagina === i + 1 ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ParqueoDashboard;
