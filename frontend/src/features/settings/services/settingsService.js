/**
 * Settings Service
 * Exposes methods to store and load theme and settings preferences from local storage.
 */

const THEME_KEY = 'app-theme';
const PREFS_KEY = 'app-preferences';

const DEFAULT_PREFERENCES = {
  notifications: true,
  emailAlerts: true,
  compactMode: false,
  autoRefresh: true,
};

/**
 * Retrieves the saved theme from local storage.
 * If not found, falls back to detecting system dark mode preferences.
 * 
 * @returns {string} 'light' | 'dark'
 */
export const getTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }
  
  // System theme fallback
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

/**
 * Persists the theme string into local storage.
 * 
 * @param {string} theme - 'light' | 'dark'
 */
export const saveTheme = (theme) => {
  if (theme === 'light' || theme === 'dark') {
    localStorage.setItem(THEME_KEY, theme);
  }
};

/**
 * Retrieves saved dashboard preferences from local storage.
 * 
 * @returns {Object} preferences structure
 */
export const getPreferences = () => {
  try {
    const saved = localStorage.getItem(PREFS_KEY);
    return saved ? { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) } : DEFAULT_PREFERENCES;
  } catch (error) {
    console.error('Failed to parse preferences from localStorage:', error);
    return DEFAULT_PREFERENCES;
  }
};

/**
 * Persists dashboard preferences into local storage.
 * 
 * @param {Object} prefs - preferences structure to save
 */
export const savePreferences = (prefs) => {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (error) {
    console.error('Failed to save preferences to localStorage:', error);
  }
};

const settingsService = {
  getTheme,
  saveTheme,
  getPreferences,
  savePreferences,
};

export default settingsService;
