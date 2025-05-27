import axios from 'axios';

const API = axios.create({
  baseURL: 'https://transmetro.onrender.com/api/empleados'
});

// ✅ Interceptor para agregar el token en cada request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getEmpleados = () => API.get('/');
export const createEmpleado = (data) => API.post('/', data);
export const deleteEmpleado = (id) => API.delete(`/${id}`);
export const updateEmpleado = (id, data) => API.put(`/${id}`, data);
export const getEmpleadosReporte = () => API.get('/reporte');