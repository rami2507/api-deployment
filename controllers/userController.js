const asyncHandler = require("express-async-handler");
const User = require("./../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res
    .status(200)
    .json({ status: "success", results: users.length, data: { users } });
});

const deleteUsers = asyncHandler(async (req, res) => {
  await User.deleteMany();
  res.status(200).json({ status: "success", message: "All users deleted" });
});

module.exports = { getUsers, deleteUsers };
