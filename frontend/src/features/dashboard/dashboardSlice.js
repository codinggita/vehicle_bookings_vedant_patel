import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardStats } from './dashboardThunks';

// Initial Dashboard State Schema
const initialState = {
  totalUsers: 0,
  totalRecords: 0,
  totalBookings: 0,
  revenue: 0,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboardState(state) {
      state.totalUsers = 0;
      state.totalRecords = 0;
      state.totalBookings = 0;
      state.revenue = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state: start loaders and clear any prior errors
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state: stop loaders, store normalized analytics response
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUsers = action.payload.totalUsers;
        state.totalRecords = action.payload.totalRecords;
        state.totalBookings = action.payload.totalBookings;
        state.revenue = action.payload.revenue;
      })
      // Rejected state: stop loaders and save error details
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to retrieve dashboard metrics.';
      });
  },
});

export const { resetDashboardState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
