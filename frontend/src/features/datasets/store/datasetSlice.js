import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDatasets,
  fetchDatasetById,
  createDataset,
  updateDataset,
  deleteDataset,
} from './datasetThunks';

const initialState = {
  datasets: [],
  selectedDataset: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  },
};

const datasetSlice = createSlice({
  name: 'datasets',
  initialState,
  reducers: {
    setSelectedDataset(state, action) {
      state.selectedDataset = action.payload;
    },
    clearSelectedDataset(state) {
      state.selectedDataset = null;
    },
    clearDatasetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch List
      .addCase(fetchDatasets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDatasets.fulfilled, (state, action) => {
        state.loading = false;
        state.datasets = action.payload.data || [];
        state.pagination = action.payload.pagination || initialState.pagination;
      })
      .addCase(fetchDatasets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed To Load Dataset';
      })

      // Fetch Detail
      .addCase(fetchDatasetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDatasetById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDataset = action.payload;
      })
      .addCase(fetchDatasetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load booking details';
      })

      // Create Dataset
      .addCase(createDataset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDataset.fulfilled, (state, action) => {
        state.loading = false;
        state.datasets.unshift(action.payload);
        if (state.pagination) {
          state.pagination.total += 1;
        }
      })
      .addCase(createDataset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed To Create Dataset';
      })

      // Update Dataset
      .addCase(updateDataset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDataset.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.datasets.findIndex((d) => d._id === updated._id);
        if (index !== -1) {
          state.datasets[index] = updated;
        }
        if (state.selectedDataset && state.selectedDataset._id === updated._id) {
          state.selectedDataset = updated;
        }
      })
      .addCase(updateDataset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed To Update Dataset';
      })

      // Delete Dataset
      .addCase(deleteDataset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDataset.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.datasets = state.datasets.filter((d) => d._id !== id);
        if (state.pagination) {
          state.pagination.total = Math.max(0, state.pagination.total - 1);
        }
      })
      .addCase(deleteDataset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed To Delete Dataset';
      });
  },
});

export const { setSelectedDataset, clearSelectedDataset, clearDatasetError } = datasetSlice.actions;
export default datasetSlice.reducer;
