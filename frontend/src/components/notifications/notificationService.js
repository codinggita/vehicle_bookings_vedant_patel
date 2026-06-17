import toast from 'react-hot-toast';
import { TOAST_DURATION } from './notificationConstants';

/**
 * Notification Service
 * Wraps react-hot-toast to standardize visual styles and execution options.
 */

export const showSuccess = (message, options = {}) => {
  return toast.success(message, {
    duration: TOAST_DURATION,
    ...options,
  });
};

export const showError = (message, options = {}) => {
  return toast.error(message, {
    duration: TOAST_DURATION,
    ...options,
  });
};

export const showWarning = (message, options = {}) => {
  return toast(message, {
    duration: TOAST_DURATION,
    icon: '⚠️',
    ...options,
  });
};

export const showInfo = (message, options = {}) => {
  return toast(message, {
    duration: TOAST_DURATION,
    icon: 'ℹ️',
    ...options,
  });
};

const notificationService = {
  showSuccess,
  showError,
  showWarning,
  showInfo,
};

export default notificationService;
