const User = require("../models/user.model");

/**
 * Service to manage customer logic, operating on User collection with role "user".
 */
const createCustomer = async (data) => {
  const customerData = {
    ...data,
    role: "user",
    isActive: true
  };
  const customer = await User.create(customerData);
  // Exclude password in response
  const result = customer.toObject();
  delete result.password;
  return result;
};

const getAllCustomers = async () => {
  return await User.find({ role: "user", isActive: true }).select("-password").lean();
};

const getCustomerById = async (id) => {
  return await User.findOne({ _id: id, role: "user", isActive: true }).select("-password").lean();
};

const deleteCustomer = async (id, soft = true) => {
  if (soft) {
    return await User.findByIdAndUpdate(id, { isActive: false }, { new: true }).select("-password").lean();
  }
  return await User.findByIdAndDelete(id).lean();
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomer
};
