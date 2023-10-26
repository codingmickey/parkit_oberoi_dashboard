import axios from 'axios';
import { BASE_URL } from '../utils';

const axiosPrivateInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

axiosPrivateInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers['Authorization'] = 'Bearer ' + token;
  return config;
});

export default axiosPrivateInstance;
