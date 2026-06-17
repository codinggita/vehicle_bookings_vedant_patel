import { useField } from 'formik';

/**
 * SelectInput Component
 * Standard styled dropdown select connected to Formik context via useField.
 */
const SelectInput = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { label, options = [], ...selectProps } = props;
  const [field, meta] = useField(selectProps);
  const isInvalid = meta.touched && meta.error;

  return (
    <div className="relative">
      <select
        {...field}
        {...selectProps}
        className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950 border text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 appearance-none cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
          isInvalid ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        <option value="">Select Option</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
  );
};

export default SelectInput;
