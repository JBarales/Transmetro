import axios from 'axios';

export const getMiEstacion = async () => {
  const token = localStorage.getItem('token');

  return axios.get('http://localhost:3000/api/policia/mi-estacion', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};