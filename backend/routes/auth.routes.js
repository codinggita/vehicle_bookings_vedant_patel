const express = require("express");
const router = express.Router();
const { 
  registerUser, 
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  refreshToken,
  getMe,
  deleteAccount
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

// OPTIONS pre-flight for login
router.options("/login", (req, res) => {
  res.setHeader("Allow", "POST, OPTIONS");
  res.status(200).end();
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);

// HEAD and GET for /me
router.head("/me", protect, (req, res) => res.status(200).end());
router.get("/me", protect, getMe);

router.delete("/account", protect, deleteAccount);

module.exports = router;
