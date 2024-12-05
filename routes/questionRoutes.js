const express = require("express");
const {
  getQuestions,
  deleteQuestions,
  createQuestion,
} = require("./../controllers/questionController");
const router = express.Router();

router.post("/create-question", createQuestion);

router.get("/get-questions", getQuestions);

router.delete("/delete-questions", deleteQuestions);

module.exports = router;
