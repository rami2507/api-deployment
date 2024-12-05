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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionModel);

module.exports = Question;
