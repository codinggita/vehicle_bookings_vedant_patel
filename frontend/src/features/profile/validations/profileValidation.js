import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Full Name is required'),
  phone: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .matches(/^\+?[1-9]\d{1,14}$/, {
      message: 'Invalid phone number format',
      excludeEmptyString: true,
    }),
  bio: Yup.string()
    .nullable()
    .max(500, 'Bio cannot exceed 500 characters'),
});

const profileValidation = {
  profileValidationSchema,
};

export default profileValidation;
