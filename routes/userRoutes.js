const express = require("express");
const { getUsers, deleteUsers } = require("../controllers/userController");
const { signup, login } = require("./../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/get-users", getUsers);
router.delete("/delete-users", deleteUsers);

module.exports = router;
