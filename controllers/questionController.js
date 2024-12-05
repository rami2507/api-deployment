const asyncHandler = require("express-async-handler");
const Question = require("../models/questionModel");
const AppError = require("../utils/appError");
const Category = require("../models/categoryModel");

const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find().populate("categoryId");
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

const createQuestion = asyncHandler(async (req, res, next) => {
  const { question, answer, categoryId } = req.body;

  if (!question || !question || !categoryId) {
    return next(new AppError("please specify all field", 400));
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    return next(new AppError("Invalid category ID", 404));
  }

  const newQuestion = new Question({ question, answer, categoryId });
  await newQuestion.save();
  res.status(201).json({
    status: "success",
    message: "Question created successfully",
    data: { newQuestion },
  });
});

module.exports = { createQuestion, getQuestions, deleteQuestions };
