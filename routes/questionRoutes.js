const express = require("express");
const {
  getQuestions,
  deleteQuestions,
  createQuestion,
} = require("./../controllers/questionController");
const {
  createQuestionValidator,
} = require("./../middlewares/validators/questionValidators");
const { validatorMiddleware } = require("./../middlewares/validatorMiddleware");
const router = express.Router();

router.post(
  "/create-question",
  createQuestionValidator,
  validatorMiddleware,
  createQuestion
);

router.get("/get-questions", getQuestions);

router.delete("/delete-questions", deleteQuestions);

module.exports = router;
