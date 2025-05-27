import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminLayout from './components/AdminLayout'; // Nuevo componente con barra
import AdminHome from './pages/AdminHome';           // Bienvenida
import AdminDashboard from './pages/AdminDashboard'; // Gestión de empleados
import ConductorDashboard from './pages/ConductorDashboard';
import PoliciaDashboard from './pages/PoliciaDashboard';
import MunicipalidadDashboard from './pages/MunicipalidadDashboard';
import EstacionDashboard from './pages/EstacionDashboard';
import ParqueoDashboard from './pages/ParqueoDashboard';
import LineaDashboard from './pages/LineaDashboard';
import BusDashboard from './pages/BusDashboard';
import ReportesDashboard from './pages/ReportesDashboard';


function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Login />} />

        {/* Rutas para admin con barra superior */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} /> {/* Bienvenida */}
          <Route path="empleados" element={<AdminDashboard />} />
          <Route path="/admin/municipalidades" element={<MunicipalidadDashboard />} />
          <Route path="/admin/estaciones" element={<EstacionDashboard />} />
          <Route path="/admin/parqueos" element={<ParqueoDashboard />} />
          <Route path="/admin/lineas" element={<LineaDashboard />} />
          <Route path="/admin/buses" element={<BusDashboard />} />
          <Route path="/admin/reportes" element={<ReportesDashboard />} />
          {/* Puedes agregar más como líneas, estaciones, etc. */}
        </Route>

        {/* Rutas por rol sin barra */}
        <Route path="/dashboard/conductor" element={<ConductorDashboard />} />
        <Route path="/dashboard/policia" element={<PoliciaDashboard />} />
        
        {/* Ruta inválida */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
