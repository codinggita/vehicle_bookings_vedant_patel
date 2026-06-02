const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  disableUser
} = require("../controllers/admin.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

// Apply authentication and administrator role guard globally across all admin routes
router.use(protect);
router.use(authorizeRoles("admin"));

// GET /api/v1/admin/dashboard
router.get("/dashboard", getDashboardStats);

// GET /api/v1/admin/users
router.get("/users", getAllUsers);

// GET /api/v1/admin/users/:id
router.get("/users/:id", getSingleUser);

// PATCH /api/v1/admin/users/:id/role
router.patch("/users/:id/role", updateUserRole);

// PATCH /api/v1/admin/users/:id/status
router.patch("/users/:id/status", disableUser);

module.exports = router;
