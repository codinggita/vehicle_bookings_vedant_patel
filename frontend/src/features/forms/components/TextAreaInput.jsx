import { useField } from 'formik';

/**
 * TextAreaInput Component
 * Standard styled textarea element connected to Formik context via useField.
 */
const TextAreaInput = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { label, ...textareaProps } = props;
  const [field, meta] = useField(textareaProps);
  const isInvalid = meta.touched && meta.error;

  return (
    <textarea
      {...field}
      {...textareaProps}
      className={`w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-none ${
        isInvalid ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
      }`}
    />
  );
};

export default TextAreaInput;
