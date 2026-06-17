import { useState } from 'react';
import { useDispatch } from 'react-redux';
import notificationService from '@components/notifications/notificationService';
import { deleteDataset } from '../store/datasetThunks';

/**
 * DeleteDatasetDialog Component
 * Confirmation dialog for permanently deleting a dataset record.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the dialog is open
 * @param {string} props.datasetId - The unique DB ID of the dataset to delete
 * @param {string} props.bookingId - The formatted Booking ID to display in message
 * @param {function} props.onClose - Closure callback
 */
const DeleteDatasetDialog = ({ isOpen, datasetId, bookingId, onClose }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!datasetId) return;
    setIsDeleting(true);
    try {
      const resultAction = await dispatch(deleteDataset(datasetId));
      if (deleteDataset.fulfilled.match(resultAction)) {
        notificationService.showSuccess('Dataset Deleted Successfully');
        onClose();
      } else {
        notificationService.showError(resultAction.payload || 'Failed To Delete Dataset');
      }
    } catch {
      notificationService.showError('Failed To Delete Dataset');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 select-none">
        
        {/* Warning Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Text */}
        <h3 className="text-center text-lg font-bold text-slate-100 mb-2">
          Delete Booking Record
        </h3>
        <p className="text-center text-sm text-slate-400 mb-6 leading-relaxed">
          Are you sure you want to permanently delete the booking <span className="text-red-400 font-semibold">{bookingId}</span>? This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Deleting...
              </>
            ) : (
              'Delete Record'
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteDatasetDialog;
