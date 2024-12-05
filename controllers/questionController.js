const asyncHandler = require("express-async-handler");
const Question = require("../models/questionModel");
const AppError = require("../utils/appError");
const Category = require("../models/categoryModel");

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

const createQuestion = asyncHandler(async (req, res, next) => {
  const { question, answer, categoryObject } = req.body;

  const categoryName = categoryObject.categoryName;
  const categoryDoc = await Category.findOne({ categoryName });

  if (!categoryDoc) {
    return next(new AppError("Category not found", 404));
  }

  const category = categoryDoc._id;

  const newQuestion = new Question({
    question,
    answer,
    category,
    categoryObject,
  });
  await newQuestion.save();
  res.status(201).json({
    status: "success",
    message: "Question created successfully",
    data: { newQuestion },
  });
});

const getQuestionByQuestionId = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const question = await Question.findById(questionId);
  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }
  res.status(200).json({
    status: "success",
    message: "Question retrieved successfully",
    data: { question },
  });
});

module.exports = {
  createQuestion,
  getQuestions,
  deleteQuestions,
  getQuestionByQuestionId,
};
