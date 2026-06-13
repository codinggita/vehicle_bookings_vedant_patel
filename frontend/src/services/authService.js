import API from './axios';

/**
 * Calls the backend login endpoint with user credentials.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} Response data containing user and token
 */
export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

const authService = {
  login,
};

export default authService;
