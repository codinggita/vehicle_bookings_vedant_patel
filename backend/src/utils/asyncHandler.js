/**
 * Reusable utility wrapper to automatically intercept rejections in async Express routes.
 * Avoids verbose try-catch blocks and propagates caught errors down the next() pipeline.
 *
 * @param {Function} fn - The asynchronous Express handler function.
 * @returns {Function} An Express middleware function.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
