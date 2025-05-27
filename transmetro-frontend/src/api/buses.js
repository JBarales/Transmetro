import axios from 'axios';

const API = axios.create({
  baseURL: 'https://transmetro.onrender.com/api/buses'
});

// Interceptor para token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Funciones usando la instancia API
export const getBuses = () => API.get('/');
export const getBusById = (id) => API.get(`/${id}`);
export const createBus = (data) => API.post('/', data);
export const updateBus = (id, data) => API.put(`/${id}`, data);
export const deleteBus = (id) => API.delete(`/${id}`);
export const getBusesReporte = () => API.get('/reporte');
