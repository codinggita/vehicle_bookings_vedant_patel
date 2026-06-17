import notificationService from '@components/notifications/notificationService';
import storage from './storage';

/**
 * Global API Error Handler
 * Normalizes Axios error payloads and triggers notifications via notificationService.
 * Cleans up invalid sessions and handles redirects on 401 Unauthorized responses.
 * 
 * @param {object} error - Axios error object
 * @returns {Promise<never>} Rejected promise containing the normalized error payload
 */
export const handleApiError = (error) => {
  let message;
  let status = null;
  let data = null;

  if (error.response) {
    status = error.response.status;
    data = error.response.data;

    // Use error message from backend if available
    const apiMessage = data?.message || data?.error || (Array.isArray(data?.errors) ? data.errors[0]?.msg : null);

    switch (status) {
      case 400:
        message = apiMessage || 'Invalid request. Please verify your entries.';
        notificationService.showError(message);
        break;

      case 401:
        message = 'Session expired. Please log in again.';
        notificationService.showError(message);
        
        // Clean session credentials from local storage
        storage.removeItem('token');
        storage.removeItem('user');
        storage.removeItem('refreshToken');
        
        // Redirect to login if not already there, with expired query param
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login?expired=true';
        }
        break;

      case 403:
        message = apiMessage || 'Access Denied: You do not have permission to perform this action.';
        notificationService.showError(message, { id: 'access-denied-toast' });
        break;

      case 404:
        message = apiMessage || 'Requested resource not found.';
        notificationService.showError(message);
        break;

      case 500:
        message = apiMessage || 'Internal server error. Please try again later.';
        notificationService.showError(message);
        break;

      default:
        message = apiMessage || `Error (${status}): Something went wrong.`;
        notificationService.showError(message);
        break;
    }
  } else if (error.request) {
    // The request was made but no response was received (e.g., network error, server offline)
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      message = 'Request timeout. The server took too long to respond. Please try again.';
    } else {
      message = 'Network error. Please check your internet connection or server status.';
    }
    notificationService.showError(message);
  } else {
    // Something happened in setting up the request that triggered an Error
    message = error.message || 'An error occurred during request setup.';
    notificationService.showError(message);
  }

  // Return normalized error object
  return Promise.reject({
    status,
    message: message || 'An unexpected error occurred.',
    data,
    originalError: error,
  });
};
