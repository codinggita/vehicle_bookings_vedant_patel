import API from './api';

/**
 * Fetches dashboard statistics from the administrative overview endpoint.
 * Requires administrator role.
 * 
 * @returns {Promise<object>} API response containing aggregate counts
 */
export const getAdminStats = async () => {
  const response = await API.get('/admin/dashboard');
  return response.data;
};

/**
 * Fetches dashboard statistics from the public analytics status endpoint.
 * Accessible to all authenticated users.
 * 
 * @returns {Promise<object>} API response containing status counts
 */
export const getUserStats = async () => {
  const response = await API.get('/analytics/booking-stats');
  return response.data;
};

const dashboardService = {
  getAdminStats,
  getUserStats,
};

export default dashboardService;
