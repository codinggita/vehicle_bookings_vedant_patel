const express = require("express");
const { createRating } = require("../controllers/rating.controller");

const router = express.Router();

router.post("/", createRating);

module.exports = router;
