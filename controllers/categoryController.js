const asyncHandler = require("express-async-handler");
const Category = require("./../models/categoryModel");
const AppError = require("./../utils/appError");

// CREATE a new category
const createCategory = asyncHandler(async (req, res, next) => {
  const { categoryName, description } = req.body;

  if (!categoryName && !description) {
    return next(
      new AppError("Please provide both category name and description", 400)
    );
  }

  const category = new Category({ categoryName, description });
  await category.save();
  res.status(201).json({
    status: "success",
    message: "Category created successfully",
    data: { category },
  });
});

// READ all categories
const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: "success",
    message: "Categories retrieved successfully",
    data: { categories },
  });
});

// READ a single category by IDC
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({
    status: "success",
    message: "Category retrieved successfully",
    data: { category },
  });
});

// UPDATE a category by ID
const updateCategory = asyncHandler(async (req, res) => {
  const { categoryName, description } = req.body;
  if (!categoryName || !description) {
    return res
      .status(400)
      .json({ message: "Please provide both category name and description" });
  }
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { categoryName, description },
    { new: true, runValidators: true }
  );
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    data: { category },
  });
});

// DELETE a category by ID
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
    data: { category },
  });
});

const deleteCategories = asyncHandler(async (req, res) => {
  await Category.deleteMany();
  res.status(200).json({
    status: "success",
    message: "All categories deleted successfully",
  });
});

module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  getCategory,
  deleteCategories,
};
