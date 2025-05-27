import axios from 'axios';

const API = axios.create({
  baseURL: 'https://transmetro.onrender.com/api/lineas'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getLineas = () => API.get('/');
export const getLineaById = (id) => API.get(`/${id}`);
export const createLinea = (data) => API.post('/', data);
export const updateLinea = (id, data) => API.put(`/${id}`, data);
export const deleteLinea = (id) => API.delete(`/${id}`);
