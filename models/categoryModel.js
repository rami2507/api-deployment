const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "categoryName is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
