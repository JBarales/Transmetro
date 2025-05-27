import React, { useEffect, useState } from 'react';
import {
  getMunicipalidades,
  createMunicipalidad,
  updateMunicipalidad,
  deleteMunicipalidad
} from '../api/municipalidades';

function MunicipalidadDashboard() {
  const [lista, setLista] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', direccion: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [editado, setEditado] = useState({ nombre: '', direccion: '' });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  const cargar = async () => {
    try {
      const res = await getMunicipalidades();
      setLista(res.data);
    } catch {
      setError('Error al cargar municipalidades');
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      await createMunicipalidad(nuevo);
      setNuevo({ nombre: '', direccion: '' });
      cargar();
    } catch {
      setError('Error al crear municipalidad');
    }
  };

  const iniciarEdicion = (m) => {
    setEditandoId(m.id);
    setEditado({ nombre: m.nombre, direccion: m.direccion });
  };

  const guardarEdicion = async () => {
    try {
      await updateMunicipalidad(editandoId, editado);
      setEditandoId(null);
      setEditado({ nombre: '', direccion: '' });
      cargar();
    } catch {
      setError('Error al actualizar municipalidad');
    }
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar esta municipalidad?')) {
      await deleteMunicipalidad(id);
      cargar();
    }
  };

  const filtradas = lista.filter(m =>
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.direccion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPaginas = Math.ceil(filtradas.length / porPagina);
  const paginadas = filtradas.slice((pagina - 1) * porPagina, pagina * porPagina);

  return (
    <div className="admin-dashboard">
      <h2>Gestión de Municipalidades</h2>

      <form onSubmit={handleCrear} className="empleado-form">
        <input
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          required
        />
        <input
          placeholder="Dirección"
          value={nuevo.direccion}
          onChange={(e) => setNuevo({ ...nuevo, direccion: e.target.value })}
          required
        />
        <button className="btn-crear" type="submit">Agregar</button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      <h3>Lista de Municipalidades</h3>

      <input
        type="text"
        placeholder="Buscar por nombre o dirección"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '300px', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <table className="tabla-empleados">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginadas.map((m) => (
            <tr key={m.id}>
              {editandoId === m.id ? (
                <>
                  <td>
                    <input
                      value={editado.nombre}
                      onChange={(e) => setEditado({ ...editado, nombre: e.target.value })}
                      required
                    />
                  </td>
                  <td>
                    <input
                      value={editado.direccion}
                      onChange={(e) => setEditado({ ...editado, direccion: e.target.value })}
                      required
                    />
                  </td>
                  <td>
                    <button onClick={guardarEdicion}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{m.nombre}</td>
                  <td>{m.direccion}</td>
                  <td>
                    <button onClick={() => iniciarEdicion(m)}>Editar</button>
                    <button onClick={() => eliminar(m.id)}>Eliminar</button>
                  </td>
                </>
              )}
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

export default MunicipalidadDashboard;
