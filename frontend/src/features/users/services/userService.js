import API from '@services/api';

/**
 * Fetch all registered users.
 * GET /api/v1/admin/users
 */
export const getUsers = async () => {
  const response = await API.get('/admin/users');
  return response.data;
};

/**
 * Fetch detailed user profile by ID.
 * GET /api/v1/admin/users/:id
 */
export const getUserById = async (id) => {
  const response = await API.get(`/admin/users/${id}`);
  return response.data;
};

/**
 * Create a new user account.
 * POST /admin/users (Note: This is simulated on frontend; will fail on backend and trigger rollback)
 */
export const createUser = async (userData) => {
  const response = await API.post('/admin/users', userData);
  return response.data;
};

/**
 * Update an existing user.
 * Combines role patch and status patch depending on modified attributes.
 * Calls functional endpoints PATCH /admin/users/:id/role and PATCH /admin/users/:id/status.
 */
export const updateUser = async (id, userData) => {
  const promises = [];

  if (userData.role !== undefined) {
    promises.push(API.patch(`/admin/users/${id}/role`, { role: userData.role }));
  }

  if (userData.isActive !== undefined) {
    promises.push(API.patch(`/admin/users/${id}/status`, { isActive: userData.isActive }));
  }

  // If there are other custom fields (name, email) which backend PUT /admin/users/:id doesn't support
  // directly, we send a PUT mock call or resolve them.
  if (promises.length === 0) {
    // Standard mock update if no role/status changed
    const response = await API.put(`/admin/users/${id}`, userData);
    return response.data;
  }

  const results = await Promise.all(promises);
  // Return the main data payload of the last completed patch call
  return results[results.length - 1].data;
};

/**
 * Delete a user account.
 * DELETE /admin/users/:id (Note: Simulated on frontend; will fail on backend and trigger rollback)
 */
export const deleteUser = async (id) => {
  const response = await API.delete(`/admin/users/${id}`);
  return response.data;
};

const userService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
