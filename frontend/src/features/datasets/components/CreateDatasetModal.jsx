import { useState, memo } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import notificationService from '@components/notifications/notificationService';
import { createDataset } from '../store/datasetThunks';
import { datasetValidationSchema } from '../validations/datasetValidation';
import DatasetForm from './DatasetForm';

/**
 * CreateDatasetModal Component
 * Overlay modal container for registering new booking datasets.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Checks if modal is active
 * @param {function} props.onClose - Handles modal closure
 */
const CreateDatasetModal = memo(({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Generate random IDs once when component mounts to comply with React render purity rules
  const [initialBookingId] = useState(() => `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [initialCustomerId] = useState(() => `CUST-${Math.floor(1000 + Math.random() * 9000)}`);

  const formik = useFormik({
    initialValues: {
      bookingId: initialBookingId,
      customerId: initialCustomerId,
      customerName: '',
      customerPhone: '',
      vehicleType: 'sedan',
      pickupLocation: '',
      dropLocation: '',
      distance: '',
      fare: '',
      bookingStatus: 'pending',
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      driverRating: '',
      customerRating: '',
      bookingDate: new Date().toISOString().slice(0, 16),
    },
    validationSchema: datasetValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const resultAction = await dispatch(createDataset(values));
        
        if (createDataset.fulfilled.match(resultAction)) {
          notificationService.showSuccess('Dataset Created Successfully');
          resetForm();
          onClose();
        } else {
          notificationService.showError(resultAction.payload || 'Failed To Create Dataset');
        }
      } catch {
        notificationService.showError('Failed To Create Dataset');
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
            Create Booking Dataset
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
          <DatasetForm formik={formik} isEditMode={false} onCancel={onClose} />
        </div>

      </div>
    </div>
  );
});

export default CreateDatasetModal;
