import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  theme: 'light',
  globalLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openSidebar(state) {
      state.sidebarOpen = true;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setGlobalLoading(state, action) {
      state.globalLoading = !!action.payload;
    },
  },
});

export const {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  setTheme,
  setGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
