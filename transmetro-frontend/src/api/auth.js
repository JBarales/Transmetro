import axios from 'axios';

const API = axios.create({
  baseURL: 'https://transmetro.onrender.com/api',
});

export const login = (credentials) => API.post('/auth/login', credentials);
