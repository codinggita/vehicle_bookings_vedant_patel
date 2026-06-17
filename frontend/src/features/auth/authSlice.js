import { createSlice } from '@reduxjs/toolkit';
import { updateProfile } from '@features/profile/store/profileThunks';

// Retrieve initial auth state from localStorage to ensure page reloads persist user sessions
const storedToken = localStorage.getItem('token');
let storedUser = null;
try {
  const parsedUser = localStorage.getItem('user');
  storedUser = parsedUser ? JSON.parse(parsedUser) : null;
} catch {
  // If parsing fails, remove the corrupted data
  localStorage.removeItem('user');
}

const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken,
  // Start loading as true if token is present to allow validation without UI flashes
  loading: !!storedToken,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth(state) {
      state.loading = true;
      state.error = null;
    },
    restoreSession(state, action) {
      const { user, token } = action.payload || {};
      state.user = user || null;
      state.token = token || null;
      state.isAuthenticated = !!token;
      state.loading = false;
      state.error = null;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user || null));
      }
    },
    setCredentials(state, action) {
      const { user, token } = action.payload || {};
      state.user = user || null;
      state.token = token || null;
      state.isAuthenticated = !!token;
      state.loading = false;
      state.error = null;

      // Persist values in localStorage
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user || null));
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      // Clean values from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setLoading(state, action) {
      state.loading = !!action.payload;
    },
    setError(state, action) {
      state.error = action.payload || null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    });
  },
});

export const {
  initializeAuth,
  restoreSession,
  setCredentials,
  logout,
  setLoading,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
