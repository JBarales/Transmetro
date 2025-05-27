import React, { useEffect, useState } from 'react';
import {
  getLineas,
  createLinea,
  updateLinea,
  deleteLinea
} from '../api/lineas';

function LineaDashboard() {
  const [lineas, setLineas] = useState([]);
  const [form, setForm] = useState({ nombre: '', distancia_total: '' });
  const [editando, setEditando] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagina, setPagina] = useState(1);
  const lineasPorPagina = 5;

  useEffect(() => {
    cargarLineas();
  }, []);

  const cargarLineas = async () => {
    const res = await getLineas();
    setLineas(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await updateLinea(editando, form);
      } else {
        await createLinea(form);
      }
      setForm({ nombre: '', distancia_total: '' });
      setEditando(null);
      cargarLineas();
    } catch (err) {
      console.error('Error al guardar línea:', err);
    }
  };

  const handleEdit = (linea) => {
    setForm({ nombre: linea.nombre, distancia_total: linea.distancia_total });
    setEditando(linea.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta línea?')) {
      await deleteLinea(id);
      cargarLineas();
    }
  };

  const lineasFiltradas = lineas.filter(linea =>
    linea.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPaginas = Math.ceil(lineasFiltradas.length / lineasPorPagina);
  const lineasPaginadas = lineasFiltradas.slice((pagina - 1) * lineasPorPagina, pagina * lineasPorPagina);

  return (
    <div className="admin-dashboard">
      <h2>Gestión de Líneas</h2>

      <form onSubmit={handleSubmit} className="empleado-form">
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Distancia total"
          value={form.distancia_total}
          onChange={(e) => setForm({ ...form, distancia_total: e.target.value })}
          required
          step="any"
        />
        <button className="btn-crear" type="submit">
          {editando ? 'Actualizar' : 'Agregar'}
        </button>
        {editando && (
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => {
              setEditando(null);
              setForm({ nombre: '', distancia_total: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '50%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <table className="tabla-empleados">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Distancia Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lineasPaginadas.map((linea) => (
            <tr key={linea.id}>
              <td>{linea.id}</td>
              <td>{linea.nombre}</td>
              <td>{linea.distancia_total}</td>
              <td>
                <button onClick={() => handleEdit(linea)}>Editar</button>
                <button onClick={() => handleDelete(linea.id)}>Eliminar</button>
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

export default LineaDashboard;
