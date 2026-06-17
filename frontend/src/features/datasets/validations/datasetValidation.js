import * as Yup from 'yup';

export const datasetValidationSchema = Yup.object().shape({
  bookingId: Yup.string()
    .required('Booking ID is required')
    .matches(/^BK-\d{4}-\d{4}$/, 'Booking ID must be in the format BK-YYYY-NNNN'),
  customerId: Yup.string()
    .required('Customer ID is required')
    .matches(/^CUST-\d{4}$/, 'Customer ID must be in the format CUST-NNNN'),
  customerName: Yup.string()
    .required('Customer Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  customerPhone: Yup.string()
    .required('Customer Phone is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  vehicleType: Yup.string()
    .required('Vehicle Type is required')
    .oneOf(['Mini', 'sedan', 'suv', 'hatchback', 'prime'], 'Invalid vehicle type'),
  pickupLocation: Yup.string()
    .required('Pickup Location is required')
    .min(2, 'Location must be at least 2 characters'),
  dropLocation: Yup.string()
    .required('Drop Location is required')
    .min(2, 'Location must be at least 2 characters'),
  distance: Yup.number()
    .required('Distance is required')
    .min(0.1, 'Distance must be at least 0.1 miles')
    .typeError('Distance must be a number'),
  fare: Yup.number()
    .required('Fare is required')
    .min(1.0, 'Fare must be at least $1.00')
    .typeError('Fare must be a number'),
  bookingStatus: Yup.string()
    .required('Booking Status is required')
    .oneOf(['Success', 'Canceled by Customer', 'Canceled by Driver', 'Driver Not Found', 'pending'], 'Invalid booking status'),
  paymentMethod: Yup.string()
    .required('Payment Method is required')
    .oneOf(['cash', 'card', 'upi'], 'Invalid payment method'),
  paymentStatus: Yup.string()
    .required('Payment Status is required')
    .oneOf(['paid', 'pending', 'failed'], 'Invalid payment status'),
  driverRating: Yup.number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .nullable()
    .typeError('Rating must be a number'),
  customerRating: Yup.number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .nullable()
    .typeError('Rating must be a number'),
  bookingDate: Yup.date()
    .required('Booking Date is required')
    .typeError('Invalid date format'),
});
