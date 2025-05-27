import React, { useState, useEffect } from 'react';
import { getEmpleadosReporte } from '../api/empleados';
import { getLineas } from '../api/lineas';
import { getEstacionesReporte } from '../api/estaciones';
import { getBusesReporte } from '../api/buses';
import { getParqueos } from '../api/parqueos';
import { getMunicipalidades } from '../api/municipalidades';

const ENTIDADES = {
  empleados: { label: 'Empleados', fetch: getEmpleadosReporte },
  lineas: { label: 'Líneas', fetch: getLineas },
  estaciones: { label: 'Estaciones', fetch: getEstacionesReporte },
  buses: { label: 'Buses', fetch: getBusesReporte },
  parqueos: { label: 'Parqueos', fetch: getParqueos },
  municipalidades: { label: 'Municipalidades', fetch: getMunicipalidades }
};

function ReportesDashboard() {
  const [entidadSeleccionada, setEntidadSeleccionada] = useState('');
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    if (entidadSeleccionada && ENTIDADES[entidadSeleccionada]) {
      ENTIDADES[entidadSeleccionada].fetch().then((res) => setDatos(res.data));
    }
  }, [entidadSeleccionada]);

  const renderTabla = () => {
    if (datos.length === 0) return null;

    const columnas = Object.keys(datos[0]);

    return (
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table className="tabla-empleados">
          <thead>
            <tr>
              {columnas.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, idx) => (
              <tr key={idx}>
                {columnas.map((col) => {
                  const valor = fila[col];

                  if (typeof valor === 'object' && valor !== null) {
                    if (valor.nombre && valor.apellido) {
                      return <td key={col}>{valor.nombre} {valor.apellido}</td>;
                    }
                    if (valor.nombre) {
                      return <td key={col}>{valor.nombre}</td>;
                    }
                    return <td key={col}>-</td>;
                  }

                  return <td key={col}>{valor}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const exportarCSV = () => {
    if (datos.length === 0) return;

    const columnas = Object.keys(datos[0]);

    const rows = datos.map((fila) =>
      columnas.map((col) => {
        const valor = fila[col];
        if (typeof valor === 'object' && valor !== null) {
          if (valor.nombre && valor.apellido) return `"${valor.nombre} ${valor.apellido}"`;
          if (valor.nombre) return `"${valor.nombre}"`;
          return '"-"';
        }
        return `"${valor ?? ''}"`;
      }).join(',')
    );

    const csvContent = [columnas.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const hoy = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_${entidadSeleccionada}_${hoy}.csv`);
    link.click();
  };

  return (
    <div className="admin-dashboard">
      <h2>Reportes del Sistema</h2>

      <select
        className="form-control"
        style={{ maxWidth: '300px', marginTop: '1rem' }}
        value={entidadSeleccionada}
        onChange={(e) => setEntidadSeleccionada(e.target.value)}
      >
        <option value="">Seleccione entidad</option>
        {Object.entries(ENTIDADES).map(([key, val]) => (
          <option key={key} value={key}>{val.label}</option>
        ))}
      </select>

      {renderTabla()}

      {datos.length > 0 && (
        <button
          className="btn btn-success"
          style={{ marginTop: '1rem' }}
          onClick={exportarCSV}
        >
          Descargar CSV
        </button>
      )}
    </div>
  );
}

export default ReportesDashboard;
