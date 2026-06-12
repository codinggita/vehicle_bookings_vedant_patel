

/**
 * Reusable Input Component (compatible with Formik and native forms)
 * 
 * @param {Object} props
 * @param {string} [props.label] - Label text
 * @param {string} props.name - Name attribute
 * @param {string|number} [props.value] - Current value
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.type='text'] - Input type (text, password, email, number, etc.)
 * @param {string|boolean} [props.error] - Validation error message
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.className=''] - Custom container styles
 * @param {string} [props.inputClassName=''] - Custom input field styles
 */
export default function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  disabled = false,
  className = '',
  inputClassName = '',
  ...props
}) {
  const hasError = !!error;
  const inputId = `input-${name}`;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-sm font-semibold text-slate-700 select-none"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-slate-900 bg-white placeholder:text-slate-400 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-offset-0 disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed
          ${hasError 
            ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-100' 
            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
          } ${inputClassName}`}
        {...props}
      />
      {hasError && typeof error === 'string' && (
        <span className="text-xs font-semibold text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}
