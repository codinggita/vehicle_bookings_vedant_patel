const Vehicle = require("../models/vehicle.model");

/**
 * Service to manage vehicle operations.
 */
const createVehicle = async (data) => {
  return await Vehicle.create(data);
};

const getVehicleById = async (id) => {
  return await Vehicle.findOne({ _id: id, isDeleted: false }).lean();
};

module.exports = {
  createVehicle,
  getVehicleById
};
