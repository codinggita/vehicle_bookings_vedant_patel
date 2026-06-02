const express = require("express");
const { createVehicle } = require("../controllers/vehicle.controller");

const router = express.Router();

router.post("/", createVehicle);

module.exports = router;
