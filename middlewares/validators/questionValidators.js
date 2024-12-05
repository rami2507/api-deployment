const { body } = require("express-validator");
const Category = require("../../models/categoryModel");
const createQuestionValidator = [
  body("question")
    .notEmpty()
    .withMessage("please specify the categoryName field"),
  body("answer").notEmpty().withMessage("please specify the description field"),
];

module.exports = { createQuestionValidator };
