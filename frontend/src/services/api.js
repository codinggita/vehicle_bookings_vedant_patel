import axios from 'axios';
import storage from '@utils/storage';
import { handleApiError } from '@utils/errorHandler';

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
 * Delegates error parsing, notifications, and token clearups to handleApiError.
 */
API.interceptors.response.use(
  (response) => response,
  handleApiError
);

export default API;
