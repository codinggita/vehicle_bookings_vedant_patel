const Payment = require("../models/payment.model");

/**
 * Service to manage payment operations.
 */
const createPayment = async (data) => {
  return await Payment.create(data);
};

const getPaymentById = async (id) => {
  return await Payment.findOne({ _id: id, isDeleted: false }).lean();
};

module.exports = {
  createPayment,
  getPaymentById
};
