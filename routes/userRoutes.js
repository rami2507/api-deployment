const express = require("express");
const { getUsers, deleteUsers } = require("../controllers/userController");
const { signup, login, protect } = require("./../controllers/authController");
const {
  signupValidator,
} = require("./../middlewares/validators/userValidator");
const { validatorMiddleware } = require("./../middlewares/validatorMiddleware");
const router = express.Router();

router.post("/signup", signupValidator, validatorMiddleware, signup);
router.post("/login", login);
router.get("/isAuthenticated", protect);

router.get("/get-users", getUsers);
router.delete("/delete-users", deleteUsers);

module.exports = router;
