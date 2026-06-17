import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { addUser } from '../store/userThunks';
import { createUserSchema } from '../validations/userValidation';
import UserForm from './UserForm';

/**
 * CreateUserModal Component
 * Renders modal sheet for user registration.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Display flag
 * @param {function} props.onClose - Closure callback
 */
const CreateUserModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: '',
      status: '',
    },
    validationSchema: createUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Map UI string status to boolean isActive expected by database
        const isActive = values.status === 'active';
        
        const resultAction = await dispatch(addUser({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
          isActive,
          status: values.status // Pass string status for optimistic state representation
        }));

        if (addUser.fulfilled.match(resultAction)) {
          toast.success('User Created Successfully');
          resetForm();
          onClose();
        } else {
          toast.error(resultAction.payload || 'Failed To Create User');
        }
      } catch {
        toast.error('An error occurred while creating user');
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Sheet Modal Body */}
      <div className="relative w-full max-w-lg p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-10 space-y-5 animate-fade-in overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Create User Account</h3>
            <p className="text-xs text-slate-500 mt-1">Register a new administrator or standard operator.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <UserForm 
          formik={formik} 
          isEditMode={false} 
          onCancel={onClose} 
        />

      </div>
    </div>
  );
};

export default CreateUserModal;
