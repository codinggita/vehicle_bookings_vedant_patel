import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NotificationProvider from '@components/notifications/NotificationProvider';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from '@routes';
import { getMe } from '@services/authService';
import { initializeAuth, restoreSession, logout } from '@features/auth/authSlice';
import MuiThemeProvider from '@features/settings/components/MuiThemeProvider';

/**
 * Validates and restores user sessions upon application mount.
 */
const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const restoreUserSession = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        // No token present, clear local state and finish load
        dispatch(logout());
        return;
      }

      dispatch(initializeAuth());

      try {
        const response = await getMe();
        if (response?.success && response?.user) {
          dispatch(restoreSession({ user: response.user, token }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Auto login session restoration failed:', error);
        dispatch(logout());
      }
    };

    restoreUserSession();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="z-10 flex flex-col items-center space-y-4">
          <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <div className="text-center space-y-1">
            <h2 className="text-lg font-semibold tracking-tight text-slate-200">VehicleSphere</h2>
            <p className="text-xs text-slate-400 font-medium">Restoring secure session...</p>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <title>VehicleSphere - Dashboard</title>
        </Helmet>
        
        <AuthInitializer>
          <MuiThemeProvider>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </MuiThemeProvider>
        </AuthInitializer>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
