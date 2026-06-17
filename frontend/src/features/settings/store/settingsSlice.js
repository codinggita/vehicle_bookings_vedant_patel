import { createSlice } from '@reduxjs/toolkit';
import { getTheme, saveTheme, getPreferences, savePreferences } from '../services/settingsService';

const initialState = {
  theme: getTheme(),
  preferences: getPreferences(),
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeState(state, action) {
      const newTheme = action.payload;
      if (newTheme === 'light' || newTheme === 'dark') {
        state.theme = newTheme;
        saveTheme(newTheme);
      }
    },
    toggleThemeState(state) {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      state.theme = nextTheme;
      saveTheme(nextTheme);
    },
    updatePreferences(state, action) {
      state.preferences = { ...state.preferences, ...action.payload };
      savePreferences(state.preferences);
    },
    setSinglePreference(state, action) {
      const { key, value } = action.payload;
      if (key in state.preferences) {
        state.preferences[key] = value;
        savePreferences(state.preferences);
      }
    },
  },
});

export const {
  setThemeState,
  toggleThemeState,
  updatePreferences,
  setSinglePreference,
} = settingsSlice.actions;

export default settingsSlice.reducer;
