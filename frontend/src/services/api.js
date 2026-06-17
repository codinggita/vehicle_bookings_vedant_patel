import axios from 'axios';
import storage from '@utils/storage';

// Centralized Axios instance configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  timeout: 10000, // 10 seconds timeout limit
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor for JWT Injection
 * Automatically retrieves the latest token from storage and injects it
 * into the Authorization header of protected outgoing API requests.
 */
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

/**
 * Response Interceptor for Global Error Handling
 * Captures 401 Unauthorized errors (expired or invalid token),
 * wipes stale credentials, and handles route redirection to login.
 */
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
