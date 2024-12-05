const mongoose = require("mongoose");

const questionModel = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    category: Object,
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionModel);

module.exports = Question;
