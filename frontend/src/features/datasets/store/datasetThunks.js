import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDatasets,
  getDatasetById,
  createDataset as apiCreateDataset,
  updateDataset as apiUpdateDataset,
  deleteDataset as apiDeleteDataset,
} from '../services/datasetService';

/**
 * fetchDatasets Async Thunk
 */
export const fetchDatasets = createAsyncThunk(
  'datasets/fetchList',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getDatasets(params);
      if (response?.success) {
        return response; // returns { data: [...], pagination: {...} }
      }
      return rejectWithValue('Invalid response structure');
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed To Load Dataset');
    }
  }
);

/**
 * fetchDatasetById Async Thunk
 */
export const fetchDatasetById = createAsyncThunk(
  'datasets/fetchDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getDatasetById(id);
      if (response?.success && response?.data) {
        return response.data;
      }
      return rejectWithValue('Invalid response structure');
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch dataset detail.');
    }
  }
);

/**
 * createDataset Async Thunk
 */
export const createDataset = createAsyncThunk(
  'datasets/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCreateDataset(data);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed To Create Dataset');
    }
  }
);

/**
 * updateDataset Async Thunk
 */
export const updateDataset = createAsyncThunk(
  'datasets/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateDataset(id, data);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed To Update Dataset');
    }
  }
);

/**
 * deleteDataset Async Thunk
 */
export const deleteDataset = createAsyncThunk(
  'datasets/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiDeleteDataset(id);
      return id;
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed To Delete Dataset');
    }
  }
);
