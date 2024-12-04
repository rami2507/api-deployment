const { body } = require("express-validator");
const createCategoryValidator = [
  body("categoryName")
    .notEmpty()
    .withMessage("please specify the categoryName field"),
  body("description")
    .notEmpty()
    .withMessage("please specify the description field"),
];

module.exports = { createCategoryValidator };
