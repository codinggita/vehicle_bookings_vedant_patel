import * as Yup from 'yup';

// Validation Schema for User Creation Form
export const createUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Full Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  role: Yup.string()
    .oneOf(['user', 'admin'], 'Invalid role value selected')
    .required('Role is required'),
  status: Yup.string()
    .oneOf(['active', 'inactive', 'blocked'], 'Invalid status value selected')
    .required('Status is required'),
});

// Validation Schema for User Editing Form (Password omitted/optional)
export const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Full Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  role: Yup.string()
    .oneOf(['user', 'admin'], 'Invalid role value selected')
    .required('Role is required'),
  status: Yup.string()
    .oneOf(['active', 'inactive', 'blocked'], 'Invalid status value selected')
    .required('Status is required'),
});

const userValidation = {
  createUserSchema,
  editUserSchema,
};

export default userValidation;
