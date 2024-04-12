import axios from 'axios';

export default function withAuth() {
  const token = sessionStorage.getItem('token');
  
  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });

  return axiosInstance;
}
