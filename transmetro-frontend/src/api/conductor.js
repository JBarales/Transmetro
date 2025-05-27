import axios from 'axios';

export const getMiBus = async () => {
  const token = localStorage.getItem('token');

  return axios.get('http://localhost:3000/api/conductor/mi-bus', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};