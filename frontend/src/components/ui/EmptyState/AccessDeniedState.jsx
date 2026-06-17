/**
 * AccessDeniedState Component
 * Displayed when a user lacks sufficient permissions for a resource or action.
 *
 * @param {Object} props
 * @param {string} [props.title='Access Denied'] - Heading text
 * @param {string} [props.message] - Optional explanation
 * @param {function} [props.onGoBack] - Callback for navigation action
 */
export default function AccessDeniedState({
  title = 'Access Denied',
  message = 'You do not have permission to view this resource. Please contact your administrator.',
  onGoBack
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 border border-red-200 dark:border-red-900/40 rounded-xl bg-red-50/30 dark:bg-red-950/10">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 mb-4 border border-red-200 dark:border-red-800/40">
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
      {message && (
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-md">
          {message}
        </p>
      )}
      {onGoBack && (
        <button
          onClick={onGoBack}
          className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
        >
          Go Back
        </button>
      )}
    </div>
  );
}
