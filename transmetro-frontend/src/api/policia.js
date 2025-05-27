import axios from 'axios';

export const getMiEstacion = async () => {
  const token = localStorage.getItem('token');

  return axios.get('https://transmetro.onrender.com/api/policia/mi-estacion', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};