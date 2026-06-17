/**
 * Reusable ErrorState Component
 * 
 * @param {Object} props
 * @param {string} props.title - Error heading title
 * @param {string} [props.message] - Error detail message
 * @param {Function} [props.onRetry] - Callback function for retrying the failed operation
 * @param {string} [props.retryLabel='Retry'] - Custom label for the retry button
 */
export default function ErrorState({
  title,
  message,
  onRetry,
  retryLabel = 'Retry'
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-red-150 dark:border-red-900/40 rounded-xl bg-red-50/30 dark:bg-red-950/10">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 mb-4 shadow-sm">
        <svg 
          className="w-6 h-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.3c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" 
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
      {message && (
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-md">
          {message}
        </p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 px-4 py-2 text-xs font-semibold rounded-lg border border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-700 dark:text-red-400 focus:ring-2 focus:ring-red-400/50 hover:border-red-300 dark:hover:border-red-700 transition-all duration-200"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}
