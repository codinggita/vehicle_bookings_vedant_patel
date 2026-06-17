import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NotificationProvider from '@components/notifications/NotificationProvider';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from '@routes';
import { getMe } from '@services/authService';
import { restoreSession, logout } from '@features/auth/authSlice';
import MuiThemeProvider from '@features/settings/components/MuiThemeProvider';
import StructuredData from '@components/seo/StructuredData';

/**
 * App Component
 * 
 * Root component that initializes global state, routing, notification contexts, 
 * and theme providers. It also handles the initial silent authentication logic 
 * to seamlessly restore valid sessions from localStorage.
 */
function App() {
  const dispatch = useDispatch();
  const { isInitialized, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Session Restoration Logic
    const initSession = async () => {
      // Avoid re-initializing if we've already done so
      if (isInitialized) return;

      if (!token) {
        dispatch(logout());
        return;
      }

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

    initSession();
  }, [dispatch, isInitialized, token]);

  return (
    <BrowserRouter>
      {/* 
        HelmetProvider supports overriding title/meta per route. 
        A global fallback title is configured here. 
      */}
      <HelmetProvider>
        <Helmet defaultTitle="VehicleSphere | Admin Dashboard" titleTemplate="%s | VehicleSphere">
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Helmet>
        
        {/* Global Structured Data JSON-LD schema */}
        <StructuredData />
        
        {/* 
          AuthInitializer acts as a suspense-like boundary ensuring the app 
          doesn't render protected routes until session validity is resolved. 
        */}
        <AuthInitializer>
          <MuiThemeProvider>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </MuiThemeProvider>
        </AuthInitializer>
      </HelmetProvider>
    </BrowserRouter>
  );
}

/**
 * AuthInitializer Component
 * Blocks UI render with a high-fidelity loading state while the initial
 * authentication verification request completes.
 */
const AuthInitializer = ({ children }) => {
  const { loading, isInitialized } = useSelector((state) => state.auth);

  // If we are actively making the first getMe() call to restore a session, show global loader
  if (loading && !isInitialized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600 blur-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo/Icon pulse container */}
          <div className="relative mb-8 w-20 h-20">
            <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-ping shadow-[0_0_40px_rgba(99,102,241,0.4)]" />
            <div className="relative flex items-center justify-center w-full h-full rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent" />
              <svg 
                className="w-10 h-10 text-indigo-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-indigo-400">
              {/* Spinner */}
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <h2 className="text-xl font-bold tracking-wide">VehicleSphere</h2>
            </div>
            <p className="text-sm text-slate-400 font-medium tracking-wide animate-pulse">
              Restoring secure session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Session verification complete, render main application
  return children;
};

export default App;
