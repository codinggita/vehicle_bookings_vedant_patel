import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAdminStats, getUserStats } from '@services/dashboardService';

/**
 * fetchDashboardStats Async Thunk
 * Fetches analytics summary metrics from the backend based on the active user's role.
 * Maps backend attributes into the structured dashboard format.
 */
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (role, { rejectWithValue }) => {
    try {
      if (role === 'admin') {
        const response = await getAdminStats();
        if (response?.success && response?.data) {
          const { totalUsers, totalBookings, completedBookings } = response.data;
          return {
            totalUsers,
            totalBookings,
            totalRecords: totalBookings,
            // Estimated platform revenue based on completing rides * avg fare ($45)
            // since backend lacks a dedicated total fare aggregator endpoint.
            revenue: (completedBookings || 0) * 45,
          };
        }
      } else {
        const response = await getUserStats();
        if (response?.success && response?.data) {
          const { totalBookings, completedBookings } = response.data;
          return {
            totalUsers: null, // Restricted for standard users
            totalBookings,
            totalRecords: totalBookings,
            revenue: (completedBookings || 0) * 45,
          };
        }
      }
      return rejectWithValue('Invalid statistics response format.');
    } catch (error) {
      // normalized error format is thrown by handleApiError interceptor
      const errorMessage = error?.message || 'Failed to fetch statistics.';
      return rejectWithValue(errorMessage);
    }
  }
);
