const express = require("express");
const router = express.Router();
const { getHealthStatus } = require("../controllers/health.controller");

// HEAD and OPTIONS for health check
router.head("/", (req, res) => res.status(200).end());
router.options("/", (req, res) => {
  res.setHeader("Allow", "GET, HEAD, OPTIONS");
  res.status(200).end();
});

// GET /api/v1/health
router.get("/", getHealthStatus);

module.exports = router;
