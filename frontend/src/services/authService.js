import API from './api';

/**
 * Calls the backend profile retrieval endpoint.
 * @returns {Promise<object>} Response data containing user profile
 */
export const getMe = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

/**
 * Calls the backend login endpoint with user credentials, then fetches 
 * user profile details if the login response only provides a token.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} Normalized response data containing success, user, and token
 */
export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  
  if (response.data?.success && response.data?.token) {
    const token = response.data.token;
    
    // Store token temporarily in localStorage so subsequent auth header calls succeed
    localStorage.setItem('token', token);
    
    try {
      const profileResponse = await getMe();
      if (profileResponse?.success && profileResponse?.user) {
        return {
          success: true,
          token,
          user: profileResponse.user,
        };
      }
    } catch (error) {
      // If fetching profile fails, clear localStorage and propagate error
      localStorage.removeItem('token');
      throw error;
    }
  }
  
  return response.data;
};

const authService = {
  login,
  getMe,
};

export default authService;
