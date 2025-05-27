import axios from 'axios';

const API = axios.create({
  baseURL: 'https://transmetro.onrender.com/api/estaciones'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const getEstaciones = () => API.get('/');
export const createEstacion = (data) => API.post('/', data);
export const updateEstacion = (id, data) => API.put(`/${id}`, data);
export const deleteEstacion = (id) => API.delete(`/${id}`);
export const getEstacionesReporte = () => API.get('/reporte');

