import API from '@services/api';

/**
 * Fetch bookings list with dynamic pagination, search, sorting, and filters.
 * GET /api/v1/bookings
 */
export const getDatasets = async (params) => {
  const response = await API.get('/bookings', { params });
  return response.data;
};

/**
 * Fetch a specific booking by its ID.
 * GET /api/v1/bookings/:id
 */
export const getDatasetById = async (id) => {
  const response = await API.get(`/bookings/${id}`);
  return response.data;
};

/**
 * Create a new booking record.
 * POST /api/v1/bookings
 */
export const createDataset = async (data) => {
  const response = await API.post('/bookings', data);
  return response.data;
};

/**
 * Update an existing booking record.
 * PUT /api/v1/bookings/:id
 */
export const updateDataset = async (id, data) => {
  const response = await API.put(`/bookings/${id}`, data);
  return response.data;
};

/**
 * Permanently delete a booking record.
 * DELETE /api/v1/bookings/:id
 */
export const deleteDataset = async (id) => {
  const response = await API.delete(`/bookings/${id}`);
  return response.data;
};

const datasetService = {
  getDatasets,
  getDatasetById,
  createDataset,
  updateDataset,
  deleteDataset,
};

export default datasetService;
