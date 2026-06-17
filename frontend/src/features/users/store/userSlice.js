import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersList, addUser, modifyUser, removeUser } from './userThunks';

// Initial Users State Schema
const initialState = {
  users: [],       // Current paginated + filtered subset visible in the table
  allUsers: [],    // Full database cache of all users
  totalUsers: 0,
  currentPage: 1,
  totalPages: 1,
  limit: 10,
  filters: {
    search: '',
    role: '',
    status: '',
  },
  loading: false,
  error: null,
  previousUsers: null, // Holds rollback backup state for optimistic failure rollbacks
};

// Internal helper to apply search terms, dropdown filters, and page slicing
const applyFiltersAndPagination = (state) => {
  let filtered = [...state.allUsers];

  // 1. Search Query filter (checks name and email)
  const searchVal = state.filters.search?.toLowerCase().trim();
  if (searchVal) {
    filtered = filtered.filter(
      (u) =>
        u.name?.toLowerCase().includes(searchVal) ||
        u.email?.toLowerCase().includes(searchVal)
    );
  }

  // 2. Role Filter (admin vs user)
  const roleVal = state.filters.role;
  if (roleVal) {
    filtered = filtered.filter((u) => u.role === roleVal);
  }

  // 3. Status Filter (active, inactive, blocked)
  // Backend represents active as boolean isActive. Inactive & Blocked map to false.
  const statusVal = state.filters.status;
  if (statusVal) {
    if (statusVal === 'active') {
      filtered = filtered.filter((u) => u.isActive === true);
    } else {
      filtered = filtered.filter((u) => u.isActive === false);
    }
  }

  // Update total counts for pagination metadata
  state.totalUsers = filtered.length;
  state.totalPages = Math.max(1, Math.ceil(filtered.length / state.limit));

  // Correct current page if it goes out of bounds
  if (state.currentPage > state.totalPages) {
    state.currentPage = state.totalPages;
  }

  // 4. Apply pagination slicing
  const startIndex = (state.currentPage - 1) * state.limit;
  state.users = filtered.slice(startIndex, startIndex + state.limit);
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Updates filters and resets the active page index to 1
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
      applyFiltersAndPagination(state);
    },
    // Changes active page index
    setPage(state, action) {
      state.currentPage = action.payload;
      applyFiltersAndPagination(state);
    },
    // Changes page limit size
    setLimit(state, action) {
      state.limit = action.payload;
      state.currentPage = 1;
      applyFiltersAndPagination(state);
    },
    // Resets search filters
    clearFilters(state) {
      state.filters = { search: '', role: '', status: '' };
      state.currentPage = 1;
      applyFiltersAndPagination(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // ==========================================
      // FETCH LIST REDUCERS
      // ==========================================
      .addCase(fetchUsersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
        applyFiltersAndPagination(state);
      })
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users list';
      })

      // ==========================================
      // CREATE USER OPTIMISTIC REDUCERS
      // ==========================================
      .addCase(addUser.pending, (state, action) => {
        // Save backup for rollback
        state.previousUsers = [...state.allUsers];

        const optimisticUser = {
          _id: `temp-${Date.now()}`,
          name: action.meta.arg.name,
          email: action.meta.arg.email,
          role: action.meta.arg.role,
          isActive: action.meta.arg.isActive ?? true,
          createdAt: new Date().toISOString(),
          isOptimistic: true,
        };

        state.allUsers.unshift(optimisticUser);
        applyFiltersAndPagination(state);
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.previousUsers = null; // Clear rollback backup
        // Replace temp optimistic user with actual user record from API
        const idx = state.allUsers.findIndex((u) => u.isOptimistic === true);
        if (idx !== -1) {
          state.allUsers[idx] = action.payload;
        }
        applyFiltersAndPagination(state);
      })
      .addCase(addUser.rejected, (state) => {
        // Rollback: restore backup
        if (state.previousUsers) {
          state.allUsers = state.previousUsers;
          state.previousUsers = null;
        }
        applyFiltersAndPagination(state);
      })

      // ==========================================
      // UPDATE USER OPTIMISTIC REDUCERS
      // ==========================================
      .addCase(modifyUser.pending, (state, action) => {
        state.previousUsers = [...state.allUsers];

        const { id, data } = action.meta.arg;
        const idx = state.allUsers.findIndex((u) => u._id === id);
        if (idx !== -1) {
          // Merge modification data optimistically
          state.allUsers[idx] = { ...state.allUsers[idx], ...data };
        }
        applyFiltersAndPagination(state);
      })
      .addCase(modifyUser.fulfilled, (state, action) => {
        state.previousUsers = null; // Clear backup
        const idx = state.allUsers.findIndex((u) => u._id === action.payload._id);
        if (idx !== -1) {
          state.allUsers[idx] = action.payload;
        }
        applyFiltersAndPagination(state);
      })
      .addCase(modifyUser.rejected, (state) => {
        // Rollback
        if (state.previousUsers) {
          state.allUsers = state.previousUsers;
          state.previousUsers = null;
        }
        applyFiltersAndPagination(state);
      })

      // ==========================================
      // DELETE USER OPTIMISTIC REDUCERS
      // ==========================================
      .addCase(removeUser.pending, (state, action) => {
        state.previousUsers = [...state.allUsers];

        const id = action.meta.arg;
        state.allUsers = state.allUsers.filter((u) => u._id !== id);
        applyFiltersAndPagination(state);
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.previousUsers = null; // Clear backup
      })
      .addCase(removeUser.rejected, (state) => {
        // Rollback
        if (state.previousUsers) {
          state.allUsers = state.previousUsers;
          state.previousUsers = null;
        }
        applyFiltersAndPagination(state);
      });
  },
});

export const { setFilters, setPage, setLimit, clearFilters } = userSlice.actions;
export default userSlice.reducer;
