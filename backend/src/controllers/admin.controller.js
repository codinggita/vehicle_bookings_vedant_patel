const mongoose = require("mongoose");
const User = require("../models/user.model");
const Booking = require("../models/booking.model");
const asyncHandler = require("../utils/asyncHandler");
const { sanitizeString } = require("../utils/dataCleaner");

/**
 * Retrieve platform overview and aggregate metrics.
 * GET /api/v1/admin/dashboard
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  // Execute database count operations in parallel for high query performance
  const [
    totalUsers,
    activeUsers,
    totalBookings,
    completedBookings,
    cancelledBookings
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ isActive: true }),
    Booking.countDocuments({ isDeleted: false }),
    Booking.countDocuments({ bookingStatus: "completed", isDeleted: false }),
    Booking.countDocuments({ bookingStatus: "cancelled", isDeleted: false })
  ]);

  return res.status(200).json({
    success: true,
    data: {
      totalUsers,
      activeUsers,
      totalBookings,
      completedBookings,
      cancelledBookings
    }
  });
});

/**
 * Retrieve all registered users.
 * GET /api/v1/admin/users
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().lean();

  return res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

/**
 * Retrieve details of a single user by ID.
 * GET /api/v1/admin/users/:id
 */
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID format"
    });
  }

  const user = await User.findById(id).lean();

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  return res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * Update the authorization role of a user.
 * PATCH /api/v1/admin/users/:id/role
 */
const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  // 1. Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID format"
    });
  }

  // 2. Validate role presence
  if (!role || String(role).trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Role is required"
    });
  }

  // 3. Validate allowed enums
  const sanitizedRole = sanitizeString(role, true);
  const allowedRoles = ["user", "admin"];

  if (!allowedRoles.includes(sanitizedRole)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role"
    });
  }

  // 4. Update the user role
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role: sanitizedRole },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  return res.status(200).json({
    success: true,
    message: "User role updated successfully",
    data: updatedUser
  });
});

/**
 * Enable or disable a user account.
 * PATCH /api/v1/admin/users/:id/status
 */
const disableUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  // 1. Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID format"
    });
  }

  // 2. Validate isActive presence and type
  if (isActive === undefined || isActive === null) {
    return res.status(400).json({
      success: false,
      message: "isActive parameter is required"
    });
  }

  if (typeof isActive !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "isActive must be a boolean value"
    });
  }

  // 3. Update the user activity status
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { isActive },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const actionText = isActive ? "enabled" : "disabled";

  return res.status(200).json({
    success: true,
    message: `User account ${actionText} successfully`,
    data: updatedUser
  });
});

module.exports = {
  getDashboardStats,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  disableUser
};
