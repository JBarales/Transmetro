import React, { useEffect, useState } from 'react';
import {
  getEstaciones,
  createEstacion,
  updateEstacion,
  deleteEstacion
} from '../api/estaciones';
import { getMunicipalidades } from '../api/municipalidades';
import { getEmpleados } from '../api/empleados';

function EstacionDashboard() {
  const [estaciones, setEstaciones] = useState([]);
  const [municipalidades, setMunicipalidades] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({ nombre: '', ubicacion: '', MunicipalidadId: '', EmpleadoId: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagina, setPagina] = useState(1);
  const estacionesPorPagina = 5;

  useEffect(() => {
    cargarEstaciones();
    getMunicipalidades().then(res => setMunicipalidades(res.data));
    getEmpleados().then(res => setEmpleados(res.data));
  }, []);

  const cargarEstaciones = async () => {
    const res = await getEstaciones();
    setEstaciones(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.MunicipalidadId || !form.EmpleadoId) {
      alert('Debe seleccionar una municipalidad y un empleado');
      return;
    }

    try {
      if (editandoId) {
        await updateEstacion(editandoId, form);
      } else {
        await createEstacion(form);
      }
      setForm({ nombre: '', ubicacion: '', MunicipalidadId: '', EmpleadoId: '' });
      setEditandoId(null);
      cargarEstaciones();
    } catch (err) {
      console.error('Error al guardar estación:', err);
      alert('Ocurrió un error al guardar. Revisa los datos.');
    }
  };

  const handleEdit = (estacion) => {
    setForm({
      nombre: estacion.nombre,
      ubicacion: estacion.ubicacion,
      MunicipalidadId: estacion.MunicipalidadId,
      EmpleadoId: estacion.EmpleadoId || ''
    });
    setEditandoId(estacion.id);
  };

  const handleDelete = async (id) => {
    await deleteEstacion(id);
    cargarEstaciones();
  };

  const estacionesFiltradas = estaciones.filter(e =>
    e.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.Municipalidad?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPaginas = Math.ceil(estacionesFiltradas.length / estacionesPorPagina);
  const estacionesPaginadas = estacionesFiltradas.slice((pagina - 1) * estacionesPorPagina, pagina * estacionesPorPagina);

  return (
    <div className="admin-dashboard">
      <h2>Gestión de Estaciones</h2>

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
        <select
          value={form.MunicipalidadId}
          onChange={(e) => setForm({ ...form, MunicipalidadId: e.target.value })}
          required
        >
          <option value="">Seleccione municipalidad</option>
          {municipalidades.map((m) => (
            <option key={m.id} value={m.id}>{m.nombre}</option>
          ))}
        </select>
        <select
          value={form.EmpleadoId}
          onChange={(e) => setForm({ ...form, EmpleadoId: e.target.value })}
          required
        >
          <option value="">Seleccione empleado</option>
          {empleados.map((e) => (
            <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>
          ))}
        </select>
        <button className="btn-crear" type="submit">{editandoId ? 'Actualizar' : 'Agregar'}</button>
        {editandoId && (
          <button
            type="button"
            onClick={() => {
              setEditandoId(null);
              setForm({ nombre: '', ubicacion: '', MunicipalidadId: '', EmpleadoId: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <input
        type="text"
        placeholder="Buscar por nombre, ubicación o municipalidad"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '300px', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <table className="tabla-empleados">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Municipalidad</th>
            <th>Empleado Asignado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estacionesPaginadas.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.nombre}</td>
              <td>{e.ubicacion}</td>
              <td>{e.Municipalidad?.nombre || '—'}</td>
              <td>{e.Empleado ? `${e.Empleado.nombre} ${e.Empleado.apellido}` : '—'}</td>
              <td>
                <button onClick={() => handleEdit(e)}>Editar</button>
                <button onClick={() => handleDelete(e.id)}>Eliminar</button>
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

export default EstacionDashboard;
