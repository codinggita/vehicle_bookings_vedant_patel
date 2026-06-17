import CrashRecovery from './CrashRecovery';

/**
 * ErrorFallbackPage Component
 * A lighter version of FallbackUI meant to be used inside the DashboardLayout
 * (e.g. when a specific route component crashes but the shell is still alive).
 */
const ErrorFallbackPage = ({ error, resetErrorBoundary }) => {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center bg-slate-900 rounded-3xl border border-slate-800 p-8">
      <div className="max-w-md w-full text-center">
        
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-slate-100 mb-3">Something went wrong</h2>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          We're sorry, but the application encountered an error while loading this page.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={resetErrorBoundary || CrashRecovery.refreshPage}
            className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            Try Again
          </button>
          <button
            onClick={CrashRecovery.goHome}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl border border-slate-700 transition-all active:scale-[0.98]"
          >
            Go Home
          </button>
        </div>
        
        {import.meta.env.MODE === 'development' && error && (
          <div className="mt-8 p-4 bg-slate-950 rounded-xl border border-slate-800 text-left overflow-hidden">
            <p className="text-red-400 font-mono text-xs font-bold mb-1 truncate">{error.toString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorFallbackPage;
