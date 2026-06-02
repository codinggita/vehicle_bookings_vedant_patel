const paymentService = require("../services/payment.service");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Controller to handle payment CRUD routes.
 */
const createPayment = asyncHandler(async (req, res) => {
  const payment = await paymentService.createPayment(req.body);
  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: payment
  });
});

module.exports = {
  createPayment
};
