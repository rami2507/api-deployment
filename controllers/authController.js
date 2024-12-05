const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  // 1) Getting Token And Check If It's There
  let token;
  let isAuthenticated = false;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token)
    return next(
      new AppError("Your are not logged in! Please login to get access", 401)
    );
  // 2) Validate token
  const decoded = await promisify(jwt.verify)(token, "JWT SECRET");
  // 3) Check If User Still Exist
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return next(
      new AppError("the user belonging to this token does no longer exist", 400)
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  isAuthenticated = true;
  next();
});

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

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid email or password!", 404));
  }

  if (user.password != password) {
    return next(new AppError("Invalid email or password!", 401));
  }

  const token = jwt.sign({ _id: user._id }, "JWT SECRET", {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, { httpOnly: true, secure: true });

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    token,
    data: { user },
  });
});

module.exports = { signup, login, protect };
