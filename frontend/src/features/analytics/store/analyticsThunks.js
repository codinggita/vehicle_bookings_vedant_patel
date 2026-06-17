import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getBookingStats,
  getTopVehicles,
  getMonthlyRides,
  getHighestFare,
  getAdminStats,
} from '../services/analyticsService';

/**
 * fetchAnalyticsData Thunk
 * Resolves multiple backend aggregations in parallel.
 * Detects user permissions to bypass protected administrative hooks.
 */
export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const isAdmin = auth.user?.role === 'admin';

      // Load core endpoints accessible to everyone
      const promises = [
        getBookingStats(),
        getTopVehicles(),
        getMonthlyRides(),
        getHighestFare(),
      ];

      // Add admin endpoint if authorized
      if (isAdmin) {
        promises.push(getAdminStats());
      }

      const results = await Promise.all(promises);

      const bookingStatsRes = results[0];
      const topVehiclesRes = results[1];
      const monthlyRidesRes = results[2];
      const highestFareRes = results[3];
      const adminStatsRes = isAdmin ? results[4] : null;

      if (!bookingStatsRes?.success || !topVehiclesRes?.success || !monthlyRidesRes?.success || !highestFareRes?.success) {
        throw new Error('Some API analytics payloads returned unsuccessful indicators.');
      }

      const bookingStats = bookingStatsRes.data || {};
      const topVehicles = topVehiclesRes.data || [];
      const monthlyRides = monthlyRidesRes.data || [];
      const highestFare = highestFareRes.data || [];
      
      let dashboardStats = {};
      if (isAdmin && adminStatsRes?.success) {
        dashboardStats = adminStatsRes.data;
      } else {
        // Fallback stats structure derived from public booking-stats
        dashboardStats = {
          totalUsers: null, // Private
          activeUsers: null, // Private
          totalBookings: bookingStats.totalBookings || 0,
          completedBookings: bookingStats.completedBookings || 0,
          cancelledBookings: bookingStats.cancelledBookings || 0,
        };
      }

      return {
        bookingStats,
        topVehicles,
        monthlyRides,
        highestFare,
        dashboardStats,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      const msg = error?.message || 'Failed to sync application analytics.';
      return rejectWithValue(msg);
    }
  }
);
