const { body } = require("express-validator");
const Category = require("../../models/categoryModel");
const createQuestionValidator = [
  body("question")
    .notEmpty()
    .withMessage("please specify the categoryName field"),
  body("answer").notEmpty().withMessage("please specify the description field"),
  body("categoryId")
    .notEmpty()
    .withMessage("please specify the categoryId field")
    .isMongoId()
    .withMessage("the categoryId is not a valid Mongod ID")
    .custom(async (value) => {
      const category = await Category.findById(value);
      if (!category) {
        throw new Error("The specified category does not exist");
      }
    }),
];

module.exports = { createQuestionValidator };
