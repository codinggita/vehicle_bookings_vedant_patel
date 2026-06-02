/**
 * Retrieve backend health and server metrics.
 * GET /api/v1/health
 */
const getHealthStatus = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
};

module.exports = {
  getHealthStatus
};
