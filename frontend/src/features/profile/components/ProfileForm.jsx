import { useDispatch } from 'react-redux';
import notificationService from '@components/notifications/notificationService';
import { updateProfile } from '../store/profileThunks';
import { profileValidationSchema } from '../validations/profileValidation';
import DynamicForm from '@features/forms/components/DynamicForm';
import { getProfileFormConfig } from '@features/forms/utils/formGenerator';

/**
 * ProfileForm Component
 * Renders profile editor inputs using the DynamicForm engine.
 * 
 * @param {Object} props
 * @param {Object} props.profile - User profile data initial values
 * @param {function} props.onCancel - Callback to exit edit mode
 */
const ProfileForm = ({ profile, onCancel }) => {
  const dispatch = useDispatch();

  const initialValues = {
    name: profile?.name || '',
    phone: profile?.phone || '',
    bio: profile?.bio || '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const resultAction = await dispatch(updateProfile(values));
      if (updateProfile.fulfilled.match(resultAction)) {
        notificationService.showSuccess('Profile Updated Successfully');
        onCancel(); // exit edit mode
      } else {
        notificationService.showError(resultAction.payload || 'Failed To Update Profile');
      }
    } catch {
      notificationService.showError('Failed To Update Profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in pt-2">
      <DynamicForm
        config={getProfileFormConfig()}
        validationSchema={profileValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitText="Save Changes"
        onCancel={onCancel}
      />
    </div>
  );
};

export default ProfileForm;
