const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  // 1) Getting Token And Check If It's There
  let token;
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
  next();
});

const isAuthenticated = asyncHandler(async (req, res) => {
  const user = req.user;
  res.json({
    status: "success",
    isAuthenticated: true,
    data: { user },
  });
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

  user.password = undefined;

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    token,
    data: { user },
  });
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", null, { expires: new Date(0) });
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to perform this action"),
        401
      );
    }
    next();
  };
};

module.exports = {
  signup,
  login,
  protect,
  isAuthenticated,
  logout,
  restrictTo,
};
