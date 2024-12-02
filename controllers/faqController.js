const asyncHandler = require("express-async-handler");
const Faq = require("./../models/faqModel");
const AppError = require("./../utils/appError");
const Workflow = require("../models/workflowModel");

const getFaqs = asyncHandler(async (req, res) => {
  const faqs = await Faq.find().lean();
  const faqWithSequentialIds = faqs.map((faq, index) => ({
    ...faq,
    displayId: index + 1, // This gives us the sequential ID
  }));
  res.status(200).json({
    status: "success",
    results: faqWithSequentialIds.length,
    data: { faqWithSequentialIds },
  });
});

const createFaq = asyncHandler(async (req, res, next) => {
  let faq = {
    question: req.body.question,
    type: req.body.type,
    isRequired: req.body.isRequired,
    isActive: req.body.isActive,
  };

  if (!faq.type) {
    next(new AppError("please specify the type", 400));
  }

  if (faq.type === "type 1") {
    if (!req.body.picklist) {
      return next(
        new AppError("Please specify the category and picklist!", 400)
      );
    }
    faq.picklist = req.body.picklist;
    faq.answer = null;
  }

  if (faq.type === "type 2") {
    if (!req.body.answer) {
      return next(new AppError("Please specify the category and answer!", 400));
    }
    faq.answer = req.body.answer;
    faq.picklist = null;
  }

  faq.category = req.body.category;

  const newFaq = await Faq.create(faq);

  // await Workflow.findByIdAndUpdate(
  //   req.body.workflowId,
  //   { $push: { faqs: newFaq._id } },
  //   { new: true }
  // );

  res.status(201).json({
    status: "success",
    data: { newFaq },
  });
});

const getFaq = asyncHandler(async (req, res) => {
  const { faqId } = req.params;

  if (!faqId) {
    return next(new AppError("please provide the faqId in the param", 404));
  }

  const faq = await Faq.findById(faqId);

  if (!faq) {
    return next(new AppError("No faq not found in the DB!", 404));
  }

  res.status(200).json({
    status: "success",
    data: { faq },
  });
});

const deleteFaqs = asyncHandler(async (req, res, next) => {
  await Faq.deleteMany();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const deleteFaq = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const faq = await Faq.findById(id);
  if (!faq) {
    return next(new AppError(`No faq found with id: ${id}`, 404));
  }
  await Faq.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: `Faq ${id} deleted successfully`,
  });
});

const updateFaq = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const faq = Faq.findById(id);
  if (!faq) {
    return next(new AppError(`No Faq found with id: ${id}`, 404));
  }
  const updatedFaq = await Faq.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedFaq,
    },
  });
});

module.exports = {
  getFaqs,
  createFaq,
  getFaq,
  deleteFaqs,
  deleteFaq,
  updateFaq,
};
