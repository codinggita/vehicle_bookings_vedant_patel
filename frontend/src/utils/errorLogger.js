const ERROR_LOG_ENDPOINT = import.meta.env.VITE_ERROR_LOG_ENDPOINT || null;

const errorLogger = {
  log: (error, errorInfo = {}) => {
    const errorPayload = {
      message: error?.message || 'Unknown error',
      stack: error?.stack || null,
      componentStack: errorInfo?.componentStack || null,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : null,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    };

    if (import.meta.env.MODE === 'development') {
      console.group('%c[ErrorLogger]', 'color: #ef4444; font-weight: bold');
      console.error('Error:', errorPayload.message);
      console.error('Stack:', errorPayload.stack);
      if (errorPayload.componentStack) {
        console.error('Component Stack:', errorPayload.componentStack);
      }
      console.groupEnd();
    }

    if (ERROR_LOG_ENDPOINT) {
      try {
        const blob = new Blob([JSON.stringify(errorPayload)], { type: 'application/json' });
        navigator.sendBeacon(ERROR_LOG_ENDPOINT, blob);
      } catch (e) {
        console.warn('Failed to send error log:', e);
      }
    }

    return errorPayload;
  },
};

export default errorLogger;
