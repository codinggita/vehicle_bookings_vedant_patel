import { createSlice } from '@reduxjs/toolkit';

// Retrieve initial auth state from localStorage to ensure page reloads persist user sessions
const storedToken = localStorage.getItem('token');
let storedUser = null;
try {
  const parsedUser = localStorage.getItem('user');
  storedUser = parsedUser ? JSON.parse(parsedUser) : null;
} catch (e) {
  console.error('Error parsing stored user data from localStorage', e);
  localStorage.removeItem('user');
}

const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
});

export const {
  setCredentials,
  logout,
  setLoading,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
