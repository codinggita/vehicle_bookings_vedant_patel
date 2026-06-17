import axios from 'axios';
import storage from '@utils/storage';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically attach authorization token to outgoing requests
API.interceptors.request.use(
  (config) => {
    const token = storage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration/validation failures
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear authenticated credentials from local storage
      storage.removeItem('token');
      storage.removeItem('user');
      storage.removeItem('refreshToken');
      
      // Redirect to login if not already there, with expired parameter
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
