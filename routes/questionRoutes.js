const express = require("express");
const {
  getQuestions,
  deleteQuestions,
} = require("./../controllers/questionController");
const router = express.Router();

router.get("/get-questions", getQuestions);

router.delete("/delete-questions", deleteQuestions);

module.exports = router;
