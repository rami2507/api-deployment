const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return next(new AppError("please provide all fields!", 400));
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    status: "success",
    message: "User registred successfully",
    data: { user },
  });
});

const login = asyncHandler(async (req, res, next) => {});

module.exports = { signup, login };
