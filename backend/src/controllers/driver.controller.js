const driverService = require("../services/driver.service");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Controller to handle driver CRUD routes.
 */
const createDriver = asyncHandler(async (req, res) => {
  const driver = await driverService.createDriver(req.body);
  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: driver
  });
});

const getAllDrivers = asyncHandler(async (req, res) => {
  const drivers = await driverService.getAllDrivers();
  return res.status(200).json({
    success: true,
    data: drivers
  });
});

const getDriverById = asyncHandler(async (req, res) => {
  const driver = await driverService.getDriverById(req.params.id);
  if (!driver) {
    return res.status(404).json({
      success: false,
      message: "Driver not found"
    });
  }
  return res.status(200).json({
    success: true,
    data: driver
  });
});

const deleteDriver = asyncHandler(async (req, res) => {
  const driver = await driverService.deleteDriver(req.params.id, true);
  if (!driver) {
    return res.status(404).json({
      success: false,
      message: "Driver not found"
    });
  }
  return res.status(200).json({
    success: true,
    message: "Deleted successfully"
  });
});

module.exports = {
  createDriver,
  getAllDrivers,
  getDriverById,
  deleteDriver
};
