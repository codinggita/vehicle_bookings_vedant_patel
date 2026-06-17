import { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { removeUser } from '../store/userThunks';

/**
 * DeleteUserDialog Component
 * Overlay dialog to confirm user account deletion.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Display flag
 * @param {function} props.onClose - Closure callback
 * @param {Object} props.user - User record targeted for deletion
 */
const DeleteUserDialog = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!user?._id) return;
    
    setIsDeleting(true);
    try {
      const resultAction = await dispatch(removeUser(user._id));

      if (removeUser.fulfilled.match(resultAction)) {
        toast.success('User Deleted Successfully');
        onClose();
      } else {
        // payload may contain rejection structure
        const errMsg = resultAction.payload?.message || 'Failed To Delete User';
        toast.error(errMsg);
      }
    } catch {
      toast.error('An error occurred while deleting user.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Confirmation Panel */}
      <div className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-10 space-y-6 animate-fade-in focus:outline-none">
        
        {/* Title area */}
        <div className="flex items-center gap-3.5 text-red-500">
          <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Delete User Account</h3>
        </div>

        {/* Warning text */}
        <div className="space-y-2">
          <p className="text-sm text-slate-300 font-medium">
            Are you sure you want to permanently delete the user{' '}
            <span className="text-white font-semibold">"{user?.name || 'this account'}"</span>?
          </p>
          <p className="text-xs text-slate-500">
            This action cannot be undone. Any associated administrative telemetry or records may be affected.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4.5 py-2.5 text-xs font-bold rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4.5 py-2.5 text-xs font-bold rounded-xl bg-red-650 hover:bg-red-700 text-white shadow-lg shadow-red-500/10 disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Deleting...
              </>
            ) : (
              'Delete User'
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteUserDialog;
