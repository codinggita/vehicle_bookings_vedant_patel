const Driver = require("../models/driver.model");

/**
 * Service to manage driver collection operations.
 */
const createDriver = async (data) => {
  return await Driver.create(data);
};

const getAllDrivers = async () => {
  return await Driver.find({ isDeleted: false }).lean();
};

const getDriverById = async (id) => {
  return await Driver.findOne({ _id: id, isDeleted: false }).lean();
};

const deleteDriver = async (id, soft = true) => {
  if (soft) {
    return await Driver.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).lean();
  }
  return await Driver.findByIdAndDelete(id).lean();
};

module.exports = {
  createDriver,
  getAllDrivers,
  getDriverById,
  deleteDriver
};
