import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { updateDataset } from '../store/datasetThunks';
import { datasetValidationSchema } from '../validations/datasetValidation';
import DatasetForm from './DatasetForm';

/**
 * EditDatasetModal Component
 * Overlay modal container for editing existing booking dataset details.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Checks if modal is active
 * @param {function} props.onClose - Handles modal closure
 */
const EditDatasetModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { selectedDataset } = useSelector((state) => state.datasets);

  // Safely format date for input field
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    try {
      const dateObj = new Date(dateStr);
      return dateObj.toISOString().slice(0, 16);
    } catch {
      return '';
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bookingId: selectedDataset?.bookingId || '',
      customerId: selectedDataset?.customerId || '',
      customerName: selectedDataset?.customerName || '',
      customerPhone: selectedDataset?.customerPhone || '',
      vehicleType: selectedDataset?.vehicleType || 'sedan',
      pickupLocation: selectedDataset?.pickupLocation || '',
      dropLocation: selectedDataset?.dropLocation || '',
      distance: selectedDataset?.distance || '',
      fare: selectedDataset?.fare || '',
      bookingStatus: selectedDataset?.bookingStatus || 'pending',
      paymentMethod: selectedDataset?.paymentMethod || 'cash',
      paymentStatus: selectedDataset?.paymentStatus || 'pending',
      driverRating: selectedDataset?.driverRating || '',
      customerRating: selectedDataset?.customerRating || '',
      bookingDate: formatDateForInput(selectedDataset?.bookingDate) || new Date().toISOString().slice(0, 16),
    },
    validationSchema: datasetValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!selectedDataset?._id) return;
      try {
        const resultAction = await dispatch(
          updateDataset({ id: selectedDataset._id, data: values })
        );

        if (updateDataset.fulfilled.match(resultAction)) {
          toast.success('Dataset Updated Successfully');
          onClose();
        } else {
          toast.error(resultAction.payload || 'Failed To Update Dataset');
        }
      } catch {
        toast.error('Failed To Update Dataset');
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-800">
          <h3 className="text-lg font-bold text-slate-100">
            Edit Booking Details
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body Container */}
        <div className="p-6 overflow-hidden">
          <DatasetForm formik={formik} isEditMode={true} onCancel={onClose} />
        </div>

      </div>
    </div>
  );
};

export default EditDatasetModal;
