import { Formik, Form } from 'formik';
import FormField from './FormField';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import CheckboxInput from './CheckboxInput';
import TextAreaInput from './TextAreaInput';

/**
 * DynamicForm Component
 * Generates custom, Formik-bound responsive form layouts from config objects.
 * 
 * @param {Object} props
 * @param {Array} props.config - List of field definition objects
 * @param {Object} props.validationSchema - Yup validation schema
 * @param {Object} props.initialValues - Default form states
 * @param {function} props.onSubmit - Submission action handler
 * @param {string} [props.submitText='Submit'] - Label for submit button
 * @param {function} [props.onCancel] - Cancel callback trigger
 * @param {string} [props.className=''] - Extra classes
 */
const DynamicForm = ({
  config = [],
  validationSchema,
  initialValues = {},
  onSubmit,
  submitText = 'Submit',
  onCancel,
  className = '',
}) => {
  
  const renderField = (field) => {
    const { name, label, type, options, placeholder, disabled, ...rest } = field;

    switch (type) {
      case 'select':
        return (
          <FormField key={name} label={label} name={name}>
            <SelectInput name={name} options={options} disabled={disabled} {...rest} />
          </FormField>
        );
      case 'checkbox':
        return (
          <div key={name} className="flex items-center h-full pt-6">
            <CheckboxInput name={name} label={label} disabled={disabled} {...rest} />
          </div>
        );
      case 'textarea':
        return (
          <FormField key={name} label={label} name={name}>
            <TextAreaInput name={name} placeholder={placeholder} disabled={disabled} {...rest} />
          </FormField>
        );
      default:
        return (
          <FormField key={name} label={label} name={name}>
            <TextInput type={type} name={name} placeholder={placeholder} disabled={disabled} {...rest} />
          </FormField>
        );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className={`space-y-5 ${className}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.map((field) => {
              const spanClass = field.gridSpan === 'full' || field.gridSpan === 2
                ? 'md:col-span-2'
                : 'md:col-span-1';
              return (
                <div key={field.name} className={spanClass}>
                  {renderField(field)}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/80 mt-6">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/15 disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                submitText
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
