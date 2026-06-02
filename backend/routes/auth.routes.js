const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");

// POST /api/v1/auth/register
router.post("/register", registerUser);

// POST /api/v1/auth/login
router.post("/login", loginUser);

module.exports = router;
