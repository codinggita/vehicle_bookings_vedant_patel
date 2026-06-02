const vehicleService = require("../services/vehicle.service");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Controller to handle vehicle CRUD routes.
 */
const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.createVehicle(req.body);
  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: vehicle
  });
});

module.exports = {
  createVehicle
};
