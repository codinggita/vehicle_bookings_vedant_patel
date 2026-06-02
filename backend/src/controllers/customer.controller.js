const customerService = require("../services/customer.service");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Controller to handle customer CRUD routes.
 */
const createCustomer = asyncHandler(async (req, res) => {
  const customer = await customerService.createCustomer(req.body);
  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: customer
  });
});

const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await customerService.getAllCustomers();
  return res.status(200).json({
    success: true,
    data: customers
  });
});

const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.id);
  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found"
    });
  }
  return res.status(200).json({
    success: true,
    data: customer
  });
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await customerService.deleteCustomer(req.params.id, true);
  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found"
    });
  }
  return res.status(200).json({
    success: true,
    message: "Deleted successfully"
  });
});

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomer
};
