import axios from 'axios';

export const getMiBus = async () => {
  const token = localStorage.getItem('token');

  return axios.get('https://transmetro.onrender.com/api/conductor/mi-bus', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};