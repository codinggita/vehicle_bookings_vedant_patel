const express = require("express");
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomer
} = require("../controllers/customer.controller");

const router = express.Router();

router.post("/", createCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);
router.delete("/:id", deleteCustomer);

module.exports = router;
