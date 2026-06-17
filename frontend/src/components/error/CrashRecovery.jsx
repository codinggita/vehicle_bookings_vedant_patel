import { logout } from '@features/auth/authSlice';
import storage from '@utils/storage';
import store from '@store';

/**
 * CrashRecovery utility module.
 * Provides functions to safely reset application state after a catastrophic runtime error.
 */
const CrashRecovery = {
  
  /**
   * Attempts to reset the application state to a safe default.
   * Purges local storage (including invalid tokens/state) and reloads the page.
   */
  fullReset: () => {
    // 1. Clear Redux auth state if accessible
    try {
      store.dispatch(logout());
    } catch (e) {
      console.warn('Could not clear redux store during crash recovery', e);
    }

    // 2. Clear local storage to remove corrupted persisted state
    try {
      storage.removeItem('token');
      storage.removeItem('user');
      storage.removeItem('refreshToken');
    } catch (e) {
      console.warn('Could not clear local storage during crash recovery', e);
    }

    // 3. Force reload from the server (bypassing browser cache)
    window.location.replace('/');
  },

  /**
   * Attempts a softer recovery by just returning to the dashboard.
   */
  goHome: () => {
    window.location.href = '/';
  },

  /**
   * Simply reloads the current page.
   */
  refreshPage: () => {
    window.location.reload();
  }
};

export default CrashRecovery;
