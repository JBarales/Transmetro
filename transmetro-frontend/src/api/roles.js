import axios from 'axios';

export const getRoles = () => axios.get('http://localhost:3000/api/roles', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
