import React, { useEffect, useState } from 'react';
import {
  getBuses,
  createBus,
  updateBus,
  deleteBus,
} from '../api/buses';
import { getLineas } from '../api/lineas';
import { getParqueos } from '../api/parqueos';
import { getEmpleados } from '../api/empleados';

function BusDashboard() {
  const [buses, setBuses] = useState([]);
  const [lineas, setLineas] = useState([]);
  const [parqueos, setParqueos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({
    placa: '',
    capacidad: '',
    LineaId: '',
    ParqueoId: '',
    EmpleadoId: '',
  });
  const [editando, setEditando] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagina, setPagina] = useState(1);
  const busesPorPagina = 5;

  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    const [resBuses, resLineas, resParqueos, resEmpleados] = await Promise.all([
      getBuses(),
      getLineas(),
      getParqueos(),
      getEmpleados()
    ]);
    setBuses(resBuses.data);
    setLineas(resLineas.data);
    setParqueos(resParqueos.data);
    setEmpleados(resEmpleados.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await updateBus(editando, form);
      } else {
        await createBus(form);
      }

      setForm({ placa: '', capacidad: '', LineaId: '', ParqueoId: '', EmpleadoId: '' });
      setEditando(null);
      cargarTodo();
    } catch (err) {
      console.error('Error al guardar:', err);
    }
  };

  const handleEdit = (bus) => {
    setForm({
      placa: bus.placa,
      capacidad: bus.capacidad,
      LineaId: bus.LineaId,
      ParqueoId: bus.ParqueoId,
      EmpleadoId: bus.EmpleadoId,
    });
    setEditando(bus.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este bus?')) {
      await deleteBus(id);
      cargarTodo();
    }
  };

  const busesFiltrados = buses.filter(bus =>
    bus.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.Linea?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.Parqueo?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${bus.Conductor?.nombre} ${bus.Conductor?.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPaginas = Math.ceil(busesFiltrados.length / busesPorPagina);
  const busesPaginados = busesFiltrados.slice((pagina - 1) * busesPorPagina, pagina * busesPorPagina);

  return (
    <div className="admin-dashboard">
      <h2>Gestión de Buses</h2>

      <form onSubmit={handleSubmit} className="empleado-form">
        <input
          type="text"
          placeholder="Placa"
          value={form.placa}
          onChange={(e) => setForm({ ...form, placa: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Capacidad"
          value={form.capacidad}
          onChange={(e) => setForm({ ...form, capacidad: e.target.value })}
          required
        />

        <select
          value={form.LineaId}
          onChange={(e) => setForm({ ...form, LineaId: e.target.value })}
          required
        >
          <option value="">Seleccione línea</option>
          {lineas.map((l) => <option key={l.id} value={l.id}>{l.nombre}</option>)}
        </select>

        <select
          value={form.ParqueoId}
          onChange={(e) => setForm({ ...form, ParqueoId: e.target.value })}
          required
        >
          <option value="">Seleccione parqueo</option>
          {parqueos.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>

        <select
          value={form.EmpleadoId}
          onChange={(e) => setForm({ ...form, EmpleadoId: e.target.value })}
          required
        >
          <option value="">Seleccione conductor</option>
          {empleados.map((e) => <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>)}
        </select>

        <button className="btn-crear" type="submit">
          {editando ? 'Actualizar' : 'Agregar'}
        </button>
        {editando && (
          <button type="button" onClick={() => {
            setEditando(null);
            setForm({ placa: '', capacidad: '', LineaId: '', ParqueoId: '', EmpleadoId: '' });
          }}>
            Cancelar
          </button>
        )}
      </form>

      <input
        type="text"
        placeholder="Buscar por placa, línea, parqueo o conductor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '50%', marginBottom: '1rem', padding: '0.5rem' }}
      />

      <table className="tabla-empleados">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Capacidad</th>
            <th>Línea</th>
            <th>Parqueo</th>
            <th>Conductor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {busesPaginados.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.placa}</td>
              <td>{bus.capacidad}</td>
              <td>{bus.Linea?.nombre || '-'}</td>
              <td>{bus.Parqueo?.nombre || '-'}</td>
              <td>{bus.Conductor?.nombre} {bus.Conductor?.apellido}</td>
              <td>
                <button onClick={() => handleEdit(bus)}>Editar</button>
                <button onClick={() => handleDelete(bus.id)}>Eliminar</button>
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

export default BusDashboard;
