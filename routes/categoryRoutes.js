const express = require("express");
const { protect } = require("./../controllers/authController");
const {
  getCategories,
  deleteCategories,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("./../controllers/categoryController");
const { validatorMiddleware } = require("../middlewares/validatorMiddleware");
const {
  createCategoryValidator,
} = require("../middlewares/validators/categoryValidators");
const router = express.Router();
router.get("/get-categories", protect, getCategories);
router.get("/get-one-category/:id", getCategory);

router.post(
  "/create-category",
  createCategoryValidator,
  validatorMiddleware,
  createCategory
);

router.patch("/update-category/:id", updateCategory);

router.delete("/delete-categories", deleteCategories);
router.delete("/delete-one-category/:id", deleteCategory);

module.exports = router;
