const Rating = require("../models/rating.model");

/**
 * Service to manage rating operations.
 */
const createRating = async (data) => {
  return await Rating.create(data);
};

const getRatingById = async (id) => {
  return await Rating.findOne({ _id: id, isDeleted: false }).lean();
};

module.exports = {
  createRating,
  getRatingById
};
