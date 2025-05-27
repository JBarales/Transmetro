import axios from 'axios';

export const getRoles = () => axios.get('https://transmetro.onrender.com/api/roles', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
