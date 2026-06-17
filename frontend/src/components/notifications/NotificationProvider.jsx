import { Toaster } from 'react-hot-toast';

/**
 * NotificationProvider Component
 * Custom wrapper rendering react-hot-toast Toaster configuration dynamically
 * styled to match theme variables.
 */
const NotificationProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: 'var(--toast-bg, #0f172a)',
            color: 'var(--toast-color, #f1f5f9)',
            border: '1px solid var(--toast-border, #1e293b)',
            fontSize: '14px',
            fontFamily: 'Outfit, sans-serif',
            padding: '12px 16px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </>
  );
};

export default NotificationProvider;
