const ratingService = require("../services/rating.service");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Controller to handle rating CRUD routes.
 */
const createRating = asyncHandler(async (req, res) => {
  const rating = await ratingService.createRating(req.body);
  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: rating
  });
});

module.exports = {
  createRating
};
