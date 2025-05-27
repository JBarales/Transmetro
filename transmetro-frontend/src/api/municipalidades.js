import axios from 'axios';

const API = axios.create({
  baseURL: 'https://transmetro.onrender.com/api/municipalidades'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getMunicipalidades = () => API.get('/');
export const createMunicipalidad = (data) => API.post('/', data);
export const updateMunicipalidad = (id, data) => API.put(`/${id}`, data);
export const deleteMunicipalidad = (id) => API.delete(`/${id}`);
