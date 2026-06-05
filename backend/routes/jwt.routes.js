const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { protect } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

// OPTIONS pre-flight for profile
router.options("/profile", (req, res) => {
  res.setHeader("Allow", "GET, OPTIONS");
  res.status(200).end();
});

router.get("/profile", protect, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

router.get("/dashboard", protect, (req, res) => {
  return res.status(200).json({ success: true, message: "Welcome to JWT Protected Dashboard", userId: req.user._id });
});

router.post("/generate-token", (req, res) => {
  const { userId, role } = req.body;
  if (!userId) return res.status(400).json({ success: false, message: "userId is required" });
  const token = jwt.sign(
    { userId, role: role || "user" },
    process.env.JWT_SECRET || "fallback_signing_secret",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
  return res.status(200).json({ success: true, token });
});

router.post("/verify-token", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ success: false, message: "token is required" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_signing_secret");
    return res.status(200).json({ success: true, decoded });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token verification failed", error: error.message });
  }
});

router.post("/refresh-token", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ success: false, message: "token is required" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_signing_secret");
    const newToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_SECRET || "fallback_signing_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
    return res.status(200).json({ success: true, token: newToken });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token refresh failed", error: error.message });
  }
});

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  return res.status(200).json({ success: true, message: "Welcome Admin" });
});

router.get("/user", protect, authorizeRoles("user", "admin"), (req, res) => {
  return res.status(200).json({ success: true, message: "Welcome User" });
});

router.delete("/logout", protect, (req, res) => {
  return res.status(200).json({ success: true, message: "JWT logged out successfully" });
});

module.exports = router;
