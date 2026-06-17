import { useField } from 'formik';

/**
 * TextInput Component
 * Standard styled text input connected to Formik context via useField.
 */
const TextInput = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { label, ...inputProps } = props;
  const [field, meta] = useField(inputProps);
  const isInvalid = meta.touched && meta.error;

  return (
    <input
      {...field}
      {...inputProps}
      className={`w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        isInvalid ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
      }`}
    />
  );
};

export default TextInput;
