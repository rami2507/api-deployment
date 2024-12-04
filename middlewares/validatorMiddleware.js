const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const validatorMiddleware = asyncHandler(async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      status: "validation error",
      errors: result.errors,
    });
  }
  next();
});

module.exports = { validatorMiddleware };
