
import axios from 'axios';
import useLoginStore from '../../store/login';

export const apiClient = axios.create({
  baseURL: '', 
  timeout: 15000,
});


apiClient.interceptors.request.use((config) => {
  const { token } = useLoginStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});