

/**
 * Reusable Button Component
 * 
 * @param {Object} props
 * @param {string} [props.label] - Button text (rendered if children is not provided)
 * @param {React.ReactNode} [props.children] - Children to render inside the button
 * @param {Function} [props.onClick] - Click handler
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Button type attribute
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.loading=false] - Loading state (shows spinner, disables button)
 * @param {'primary' | 'secondary' | 'outline' | 'danger'} [props.variant='primary'] - Button style variant
 * @param {string} [props.className=''] - Custom Tailwind CSS overrides
 */
export default function Button({
  label,
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm px-4 py-2.5';
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm active:bg-indigo-800',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-400 active:bg-slate-300',
    outline: 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 focus:ring-indigo-500 active:bg-slate-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm active:bg-red-800',
  };

  const isBtnDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isBtnDisabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {label || children}
    </button>
  );
}
