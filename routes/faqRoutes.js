const express = require("express");
const {
  getFaqs,
  getFaq,
  deleteFaqs,
  createFaq,
  deleteFaq,
} = require("./../controllers/faqController");

const router = express.Router();

router.get("/get-faqs", getFaqs);
router.get("/get-faq/:faqId", getFaq);
router.post("/create-faq", createFaq);
router.delete("/delete-faqs", deleteFaqs);
router.delete("/delete-faq/:id", deleteFaq);

module.exports = router;
