import { useField } from 'formik';

/**
 * CheckboxInput Component
 * Standard styled checkbox element connected to Formik context via useField.
 */
const CheckboxInput = ({ label, ...props }) => {
  const [field] = useField({ ...props, type: 'checkbox' });

  return (
    <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-slate-300 select-none">
      <input
        type="checkbox"
        {...field}
        {...props}
        className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500/30 focus:ring-offset-0 focus:outline-none transition-all cursor-pointer"
      />
      <span>{label}</span>
    </label>
  );
};

export default CheckboxInput;
