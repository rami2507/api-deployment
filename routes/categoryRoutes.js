const express = require("express");
const { getCategories } = require("./../controllers/categoryController");
const router = express.Router();

router.get("/getCategories", getCategories);

module.exports = router;
