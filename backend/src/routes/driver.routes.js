const express = require("express");
const {
  createDriver,
  getAllDrivers,
  getDriverById,
  deleteDriver
} = require("../controllers/driver.controller");

const router = express.Router();

router.post("/", createDriver);
router.get("/", getAllDrivers);
router.get("/:id", getDriverById);
router.delete("/:id", deleteDriver);

module.exports = router;
