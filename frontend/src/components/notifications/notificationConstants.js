/**
 * Notification Constants
 * Establishes centralized defaults for toast timers and generic API warnings.
 */

export const TOAST_DURATION = 4000; // 4 seconds

export const NOTIFICATION_MESSAGES = {
  NETWORK_ERROR: 'Network connection error. Please verify your connection status.',
  UNAUTHORIZED: 'Session expired. Please log in again.',
  FORBIDDEN: 'Access Denied: You do not have permission to view this section.',
  SERVER_ERROR: 'Internal server error. Our engineers are investigating. Please try again later.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
};
