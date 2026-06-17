import { useField } from 'formik';

/**
 * FormField Component
 * Layout wrapper that maps input labels, wraps child fields, and displays error messages dynamically.
 * 
 * @param {Object} props
 * @param {string} props.label - The input display label
 * @param {string} props.name - The unique field name attribute
 * @param {React.ReactNode} props.children - The specific input component element
 */
const FormField = ({ label, name, children }) => {
  const [, meta] = useField(name);
  const isInvalid = meta.touched && meta.error;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">
          {label}
        </label>
      )}
      {children}
      {isInvalid && (
        <p className="text-red-400 text-xs font-medium pl-1">
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default FormField;
