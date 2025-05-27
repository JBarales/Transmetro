import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/parqueos'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getParqueos = () => API.get('/');
export const createParqueo = (data) => API.post('/', data);
export const updateParqueo = (id, data) => API.put(`/${id}`, data);
export const deleteParqueo = (id) => API.delete(`/${id}`);
