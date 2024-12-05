const asyncHandler = require("express-async-handler");
const Question = require("../models/questionModel");

const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find();
  res.status(200).json({
    status: "success",
    message: "Questions retrieved successfully",
    data: { questions },
  });
});

const deleteQuestions = asyncHandler(async (req, res) => {
  await Question.deleteMany();
  res.status(200).json({
    status: "success",
    message: "All questions deleted successfully",
  });
});

module.exports = { getQuestions, deleteQuestions };
