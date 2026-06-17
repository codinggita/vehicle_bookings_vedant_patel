import API from '../../../services/api';

/**
 * Analytics API Service
 * Coordinates request communications with backend metrics endpoints.
 */

export const getBookingStats = async () => {
  const response = await API.get('/analytics/booking-stats');
  return response.data;
};

export const getTopVehicles = async () => {
  const response = await API.get('/analytics/top-vehicles');
  return response.data;
};

export const getMonthlyRides = async () => {
  const response = await API.get('/analytics/monthly-rides');
  return response.data;
};

export const getHighestFare = async () => {
  const response = await API.get('/analytics/highest-fare');
  return response.data;
};

export const getAdminStats = async () => {
  const response = await API.get('/admin/dashboard');
  return response.data;
};

const analyticsService = {
  getBookingStats,
  getTopVehicles,
  getMonthlyRides,
  getHighestFare,
  getAdminStats,
};

export default analyticsService;
