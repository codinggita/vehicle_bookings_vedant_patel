import API from '@services/api';

/**
 * Fetch current user profile.
 * GET /api/v1/auth/me
 */
export const getProfile = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

/**
 * Update current user profile fields (name, phone, bio).
 * PUT /api/v1/profile
 */
export const updateProfile = async (profileData) => {
  const response = await API.put('/profile', profileData);
  return response.data;
};

const profileService = {
  getProfile,
  updateProfile,
};

export default profileService;
