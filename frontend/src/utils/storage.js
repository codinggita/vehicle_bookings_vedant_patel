/**
 * Safe local storage utility wrapper
 */
const storage = {
  /**
   * Retrieves an item from localStorage.
   * @param {string} key - Storage key
   * @returns {string|null}
   */
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (error) {
      console.error(`Error getting item "${key}" from localStorage:`, error);
    }
    return null;
  },

  /**
   * Saves an item to localStorage.
   * @param {string} key - Storage key
   * @param {string} value - Value to store
   */
  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error setting item "${key}" in localStorage:`, error);
    }
  },

  /**
   * Removes an item from localStorage.
   * @param {string} key - Storage key
   */
  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing item "${key}" from localStorage:`, error);
    }
  },

  /**
   * Clears all items from localStorage.
   */
  clear: () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

export default storage;
