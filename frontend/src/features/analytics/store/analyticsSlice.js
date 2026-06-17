import { createSlice } from '@reduxjs/toolkit';
import { fetchAnalyticsData } from './analyticsThunks';

const initialState = {
  dashboardStats: {}, // administrative counters
  bookingStats: {},   // booking counts by status
  monthlyRides: [],   // chronological charts trend
  topVehicles: [],    // vehicle aggregation data
  revenueStats: [],   // list insights / fare records
  loading: false,
  error: null,
  lastUpdated: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalyticsState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state, action) => {
        // If background refresh is silent, bypass full page loading block
        const isSilent = action.meta.arg?.silent;
        if (!isSilent) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        const { bookingStats, topVehicles, monthlyRides, highestFare, dashboardStats, lastUpdated } = action.payload;
        state.loading = false;
        state.bookingStats = bookingStats;
        state.topVehicles = topVehicles;
        state.monthlyRides = monthlyRides;
        state.revenueStats = highestFare;
        state.dashboardStats = dashboardStats;
        state.lastUpdated = lastUpdated;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        // Do not overwrite existing cache if silent refresh failed in background
        const isSilent = action.meta.arg?.silent;
        if (!isSilent) {
          state.error = action.payload || 'Failed to sync platform telemetry.';
        }
      });
  },
});

export const { clearAnalyticsState } = analyticsSlice.actions;
export default analyticsSlice.reducer;
