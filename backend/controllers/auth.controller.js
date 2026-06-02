const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Inlined sanitizeString helper
const sanitizeString = (val, normalizeCasing = false) => {
  if (val === undefined || val === null) return null;
  const str = String(val).trim().toLowerCase();
  if (str === "" || str === "null" || str === "undefined" || str === "n/a" || str === "#name?") {
    return null;
  }
  const trimmed = String(val).trim();
  return normalizeCasing ? trimmed.toLowerCase() : trimmed;
};

// Inlined generateToken helper
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || "fallback_signing_secret",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

/**
 * Register a new application user.
 * POST /api/v1/auth/register
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate required fields are not empty
    if (!name || String(name).trim() === "") {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!email || String(email).trim() === "") {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!password || String(password).trim() === "") {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    // 2. Sanitize and normalize inputs
    const cleanedName = sanitizeString(name);
    const cleanedEmail = sanitizeString(email, true); // Force lowercase email

    // Password length validation
    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      });
    }

    // 3. Verify user does not already exist
    const existingUser = await User.findOne({ email: cleanedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // 4. Securely hash the user's password using bcryptjs
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 5. Save the new user document to MongoDB
    const newUser = new User({
      name: cleanedName,
      email: cleanedEmail,
      password: hashedPassword,
      role: "user",
      isActive: true
    });

    await newUser.save();

    // 6. Return standard success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("Error during user registration:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error during user registration"
    });
  }
};

/**
 * Authenticate a user and return a JWT access token.
 * POST /api/v1/auth/login
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate required fields
    if (!email || String(email).trim() === "") {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!password || String(password).trim() === "") {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    // 2. Sanitize input email
    const cleanedEmail = sanitizeString(email, true);

    // 3. Locate the user in the database (explicitly selecting the hidden password field)
    const user = await User.findOne({ email: cleanedEmail }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // 4. Ensure the user account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is deactivated. Please contact administration"
      });
    }

    // 5. Verify the password match using bcryptjs
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // 6. Generate secure access token
    const token = generateToken(user._id, user.role);

    // 7. Return standard compliant response
    return res.status(200).json({
      success: true,
      token
    });

  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during user login"
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};
