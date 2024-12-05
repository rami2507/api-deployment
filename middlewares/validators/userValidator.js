const { body } = require("express-validator");
const User = require("./../../models/userModel");
const signupValidator = [
  body("email")
    .notEmpty()
    .withMessage("please specify the email field")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (value) => {
      const isExist = await User.findOne({ email: value });
      if (isExist) {
        throw new Error("Email already exists");
      }
    }),
  body("password").notEmpty().withMessage("please specify the password field"),
];

module.exports = { signupValidator };
