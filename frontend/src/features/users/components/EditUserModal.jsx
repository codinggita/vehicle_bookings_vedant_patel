import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import notificationService from '@components/notifications/notificationService';
import { modifyUser } from '../store/userThunks';
import { editUserSchema } from '../validations/userValidation';
import UserForm from './UserForm';

/**
 * EditUserModal Component
 * Pre-filled modal for modifying an existing user's details.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Display flag
 * @param {function} props.onClose - Closure callback
 * @param {Object} props.user - The user object currently being edited
 */
const EditUserModal = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();

  // Status mapping: backend isActive boolean maps to UI string status
  const getUserStatus = (u) => {
    if (u?.isActive === true) return 'active';
    return 'inactive'; // fallback or mapped status
  };

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || '',
      status: getUserStatus(user),
    },
    validationSchema: editUserSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const isActive = values.status === 'active';
        
        const resultAction = await dispatch(modifyUser({
          id: user._id,
          data: {
            name: values.name,
            email: values.email,
            role: values.role,
            isActive
          }
        }));

        if (modifyUser.fulfilled.match(resultAction)) {
          notificationService.showSuccess('User Updated Successfully');
          onClose();
        } else {
          notificationService.showError(resultAction.payload || 'Failed To Update User');
        }
      } catch {
        notificationService.showError('An error occurred while updating user');
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

      {/* Modal Card */}
      <div className="relative w-full max-w-lg p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-10 space-y-5 animate-fade-in overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Edit User Profile</h3>
            <p className="text-xs text-slate-500 mt-1">Modify account details and role permissions.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors"
            aria-label="Close edit modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Shared Form Component */}
        <UserForm 
          formik={formik} 
          isEditMode={true} 
          onCancel={onClose} 
        />

      </div>
    </div>
  );
};

export default EditUserModal;
