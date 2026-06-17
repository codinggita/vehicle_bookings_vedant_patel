import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';

/**
 * fetchUsersList Async Thunk
 * Retrieves the comprehensive users list from backend administration.
 */
export const fetchUsersList = createAsyncThunk(
  'users/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      if (response?.success && response?.data) {
        return response.data;
      }
      return rejectWithValue('Invalid users response structure');
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to load users list.');
    }
  }
);

/**
 * addUser Async Thunk
 * Triggers backend request to create a new user profile.
 */
export const addUser = createAsyncThunk(
  'users/add',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to create user.');
    }
  }
);

/**
 * modifyUser Async Thunk
 * Patches user role/status attributes for a given user ID.
 */
export const modifyUser = createAsyncThunk(
  'users/modify',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateUser(id, data);
      return response.data || { _id: id, ...data };
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to update user.');
    }
  }
);

/**
 * removeUser Async Thunk
 * Deletes user profile from backend database.
 */
export const removeUser = createAsyncThunk(
  'users/remove',
  async (id, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue({ id, message: error?.message || 'Failed to delete user.' });
    }
  }
);
