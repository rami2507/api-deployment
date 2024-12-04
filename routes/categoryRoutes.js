const express = require("express");
const {
  getCategories,
  deleteCategories,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("./../controllers/categoryController");
const router = express.Router();

router.get("/get-categories", getCategories);
router.get("/get-one-category/:id", getCategory);

router.post("/create-category", createCategory);

router.patch("/update-category/:id", updateCategory);

router.delete("/delete-categories", deleteCategories);
router.delete("/delete-one-category/:id", deleteCategory);

module.exports = router;
