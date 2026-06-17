/**
 * Helper to construct form field config item.
 */
export const createField = (name, label, type = 'text', options = {}) => {
  return { name, label, type, ...options };
};

/**
 * Returns configuration for Login Form.
 */
export const getLoginFormConfig = () => [
  createField('email', 'Email Address', 'email', { placeholder: 'johndoe@example.com', gridSpan: 2 }),
  createField('password', 'Password', 'password', { placeholder: '••••••••', gridSpan: 2 }),
];

/**
 * Returns configuration for Register Form.
 */
export const getRegisterFormConfig = () => [
  createField('name', 'Full Name', 'text', { placeholder: 'John Doe', gridSpan: 2 }),
  createField('email', 'Email Address', 'email', { placeholder: 'johndoe@example.com', gridSpan: 2 }),
  createField('password', 'Password', 'password', { placeholder: '••••••••', gridSpan: 2 }),
  createField('confirmPassword', 'Confirm Password', 'password', { placeholder: '••••••••', gridSpan: 2 }),
];

/**
 * Returns configuration for User Management Forms.
 */
export const getUserFormConfig = (isEditMode = false) => {
  const fields = [
    createField('name', 'Full Name', 'text', { placeholder: 'John Doe', gridSpan: 2 }),
    createField('email', 'Email Address', 'email', { placeholder: 'johndoe@example.com', gridSpan: 2 }),
  ];

  if (!isEditMode) {
    fields.push(createField('password', 'Password', 'password', { placeholder: '••••••••', gridSpan: 2 }));
  }

  fields.push(
    createField('role', 'Role', 'select', {
      options: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
      ],
    }),
    createField('status', 'Status', 'select', {
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'blocked', label: 'Blocked' },
      ],
    })
  );

  return fields;
};

/**
 * Returns configuration for Dataset (Booking) CRUD Forms.
 */
export const getDatasetFormConfig = (isEditMode = false) => [
  createField('bookingId', 'Booking ID', 'text', { placeholder: 'BK-2026-0001', disabled: isEditMode }),
  createField('customerId', 'Customer ID', 'text', { placeholder: 'CUST-1001' }),
  createField('customerName', 'Customer Name', 'text', { placeholder: 'John Doe' }),
  createField('customerPhone', 'Customer Phone', 'text', { placeholder: '+15550100' }),
  createField('pickupLocation', 'Pickup Location', 'text', { placeholder: 'Times Square, NY' }),
  createField('dropLocation', 'Drop Location', 'text', { placeholder: 'JFK Airport, NY' }),
  createField('vehicleType', 'Vehicle Type', 'select', {
    options: [
      { value: 'Mini', label: 'Mini' },
      { value: 'sedan', label: 'Sedan' },
      { value: 'suv', label: 'SUV' },
      { value: 'hatchback', label: 'Hatchback' },
      { value: 'prime', label: 'Prime' },
    ],
  }),
  createField('distance', 'Distance (mi)', 'number', { placeholder: '10.5' }),
  createField('fare', 'Fare ($)', 'number', { placeholder: '45.50' }),
  createField('bookingStatus', 'Booking Status', 'select', {
    options: [
      { value: 'Success', label: 'Success' },
      { value: 'Canceled by Customer', label: 'Canceled by Customer' },
      { value: 'Canceled by Driver', label: 'Canceled by Driver' },
      { value: 'Driver Not Found', label: 'Driver Not Found' },
      { value: 'pending', label: 'Pending' },
    ],
  }),
  createField('paymentMethod', 'Payment Method', 'select', {
    options: [
      { value: 'cash', label: 'Cash' },
      { value: 'card', label: 'Card' },
      { value: 'upi', label: 'UPI' },
    ],
  }),
  createField('paymentStatus', 'Payment Status', 'select', {
    options: [
      { value: 'paid', label: 'Paid' },
      { value: 'pending', label: 'Pending' },
      { value: 'failed', label: 'Failed' },
    ],
  }),
  createField('driverRating', 'Driver Rating', 'number', { placeholder: '5' }),
  createField('customerRating', 'Customer Rating', 'number', { placeholder: '5' }),
  createField('bookingDate', 'Booking Date', 'datetime-local'),
];

/**
 * Returns configuration for Profile Edit Form.
 */
export const getProfileFormConfig = () => [
  createField('name', 'Full Name', 'text', { placeholder: 'John Doe', gridSpan: 2 }),
  createField('phone', 'Phone Number', 'text', { placeholder: '+15550100', gridSpan: 2 }),
  createField('bio', 'Bio / Profile Information', 'textarea', { placeholder: 'Write a short bio...', gridSpan: 2 }),
];
