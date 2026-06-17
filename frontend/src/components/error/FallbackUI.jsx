import { useState } from 'react';
import CrashRecovery from './CrashRecovery';

/**
 * FallbackUI Component
 * Displays a full-screen, user-friendly error page when a catastrophic crash occurs.
 * 
 * @param {Object} props
 * @param {Error} props.error - The error object caught by the ErrorBoundary
 */
const FallbackUI = ({ error }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Is this running in development mode?
  const isDev = import.meta.env.MODE === 'development';

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 font-sans text-slate-200">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Background glow decoration */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-8 mx-auto md:mx-0">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Typography */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center md:text-left tracking-tight">
            Something went wrong
          </h1>
          <p className="text-slate-400 text-lg mb-8 text-center md:text-left leading-relaxed">
            The application encountered an unexpected runtime error. We apologize for the inconvenience. You can try refreshing the page or returning home.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <button
              onClick={CrashRecovery.refreshPage}
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4" />
              </svg>
              Refresh Page
            </button>
            <button
              onClick={CrashRecovery.goHome}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Dashboard
            </button>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm text-slate-500 text-center sm:text-left">
                If the problem persists, please contact support.
              </span>
              <button
                onClick={() => CrashRecovery.fullReset()}
                className="text-sm text-red-400 hover:text-red-300 font-semibold underline decoration-red-400/30 underline-offset-4 text-center sm:text-right transition-colors"
              >
                Clear all app data
              </button>
            </div>
          </div>

          {/* Developer Details Toggle */}
          {isDev && (
            <div className="mt-10">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs font-mono text-slate-500 hover:text-slate-300 flex items-center gap-2 mb-4 transition-colors"
              >
                <svg className={`w-4 h-4 transform transition-transform ${showDetails ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {showDetails ? 'Hide Error Details' : 'Show Error Details'}
              </button>
              
              {showDetails && error && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto text-left">
                  <p className="text-red-400 font-mono text-sm font-bold mb-2">{error.toString()}</p>
                  <pre className="text-slate-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                    {error.componentStack || error.stack}
                  </pre>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FallbackUI;
