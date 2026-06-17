import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile, updateProfile as apiUpdateProfile } from '../services/profileService';

/**
 * fetchProfile Async Thunk
 */
export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();
      if (response?.success && response?.user) {
        return response.user;
      }
      return rejectWithValue('Invalid profile response structure');
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch profile.');
    }
  }
);

/**
 * updateProfile Async Thunk
 */
export const updateProfile = createAsyncThunk(
  'profile/update',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await apiUpdateProfile(profileData);
      if (response?.success && response?.data) {
        return response.data;
      }
      return rejectWithValue('Invalid profile update response');
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed To Update Profile');
    }
  }
);
