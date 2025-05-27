import React, { useEffect, useState } from 'react';
import { getEmpleados, createEmpleado, deleteEmpleado } from '../api/empleados';
import { getRoles } from '../api/roles';
import { updateEmpleado } from '../api/empleados';

function AdminDashboard() {
  const [empleados, setEmpleados] = useState([]);
  const [rolesDisponibles, setRolesDisponibles] = useState([]);
  const [nuevo, setNuevo] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    historial_educativo: '',
    rol_id: '',
    password: ''
  });
  const [error, setError] = useState('');
  const nombre = localStorage.getItem('nombre');

  const [searchTerm, setSearchTerm] = useState('');
  const [pagina, setPagina] = useState(1);
  const empleadosPorPagina = 5;

  const cargarEmpleados = async () => {
    try {
      const res = await getEmpleados();
      setEmpleados(res.data);
    } catch {
      setError('Error al cargar empleados');
    }
  };

  const cargarRoles = async () => {
    try {
      const res = await getRoles();
      setRolesDisponibles(res.data);
    } catch {
      setError('Error al cargar roles');
    }
  };

  const [editandoId, setEditandoId] = useState(null);
  const [editado, setEditado] = useState({});

  const iniciarEdicion = (emp) => {
    setEditandoId(emp.id);
    setEditado({ ...emp, password: '' });
  };

  const guardarCambios = async () => {
    try {
      await updateEmpleado(editandoId, editado);
      setEditandoId(null);
      cargarEmpleados();
    } catch {
      setError('Error al actualizar empleado');
    }
  };

  useEffect(() => {
    cargarEmpleados();
    cargarRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createEmpleado(nuevo);
      setNuevo({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        direccion: '',
        historial_educativo: '',
        rol_id: '',
        password: ''
      });
      cargarEmpleados();
    } catch {
      setError('Error al crear empleado (correo duplicado o datos faltantes)');
    }
  };

  const eliminar = async (id) => {
    await deleteEmpleado(id);
    cargarEmpleados();
  };

  const empleadosFiltrados = empleados.filter(emp =>
    emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPaginas = Math.ceil(empleadosFiltrados.length / empleadosPorPagina);
  const empleadosPaginados = empleadosFiltrados.slice((pagina - 1) * empleadosPorPagina, pagina * empleadosPorPagina);

  return (
    <div className="admin-dashboard">
      <h2>Panel del Administrador</h2>
      <p>Bienvenido, <strong>{nombre}</strong></p>

      <h3>Crear nuevo empleado</h3>
      <form onSubmit={handleSubmit} className="empleado-form">
        <input
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          required
        />
        <input
          placeholder="Apellido"
          value={nuevo.apellido}
          onChange={(e) => setNuevo({ ...nuevo, apellido: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={nuevo.correo}
          onChange={(e) => setNuevo({ ...nuevo, correo: e.target.value })}
          required
        />
        <input
          placeholder="Teléfono"
          value={nuevo.telefono}
          onChange={(e) => setNuevo({ ...nuevo, telefono: e.target.value })}
          required
        />
        <input
          placeholder="Dirección"
          value={nuevo.direccion}
          onChange={(e) => setNuevo({ ...nuevo, direccion: e.target.value })}
          required
        />
        <textarea
          placeholder="Historial educativo"
          value={nuevo.historial_educativo}
          onChange={(e) => setNuevo({ ...nuevo, historial_educativo: e.target.value })}
          required
        />
        <select
          value={nuevo.rol_id}
          onChange={(e) => setNuevo({ ...nuevo, rol_id: e.target.value })}
          required
        >
          <option value="">Seleccione un rol</option>
          {rolesDisponibles.map(rol => (
            <option key={rol.id} value={rol.id}>
              {rol.nombre}
            </option>
          ))}
        </select>
        <input
          type="password"
          placeholder="Contraseña"
          value={nuevo.password}
          onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })}
          required
        />
        <button className="btn-crear" type="submit">Crear empleado</button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      <h3>Lista de empleados</h3>

      <div style={{ maxWidth: '400px', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o correo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <table className="tabla-empleados">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Historial</th>
            <th>Rol</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosPaginados.map((emp) => (
            <tr key={emp.id}>
              {editandoId === emp.id ? (
                <>
                  <td><input value={editado.nombre} onChange={(e) => setEditado({ ...editado, nombre: e.target.value })} /></td>
                  <td><input value={editado.apellido} onChange={(e) => setEditado({ ...editado, apellido: e.target.value })} /></td>
                  <td><input value={editado.correo} onChange={(e) => setEditado({ ...editado, correo: e.target.value })} /></td>
                  <td><input value={editado.telefono} onChange={(e) => setEditado({ ...editado, telefono: e.target.value })} /></td>
                  <td><input value={editado.direccion} onChange={(e) => setEditado({ ...editado, direccion: e.target.value })} /></td>
                  <td><textarea value={editado.historial_educativo} onChange={(e) => setEditado({ ...editado, historial_educativo: e.target.value })} /></td>
                  <td>
                    <select value={editado.rol_id} onChange={(e) => setEditado({ ...editado, rol_id: e.target.value })}>
                      {rolesDisponibles.map(rol => (
                        <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                      ))}
                    </select>
                  </td>
                  <td><input type="password" placeholder="Nueva contraseña" value={editado.password} onChange={(e) => setEditado({ ...editado, password: e.target.value })} /></td>
                  <td>
                    <button onClick={guardarCambios}>Guardar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{emp.nombre}</td>
                  <td>{emp.apellido}</td>
                  <td>{emp.correo}</td>
                  <td>{emp.telefono}</td>
                  <td>{emp.direccion}</td>
                  <td>{emp.historial_educativo}</td>
                  <td>{rolesDisponibles.find(r => r.id === emp.rol_id)?.nombre || ''}</td>
                  <td>••••••••</td>
                  <td>
                    <button onClick={() => iniciarEdicion(emp)}>Editar</button>
                    <button onClick={() => eliminar(emp.id)}>Eliminar</button>
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

export default AdminDashboard;