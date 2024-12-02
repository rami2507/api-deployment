const express = require("express");
const {
  getFaqs,
  getFaq,
  deleteFaqs,
  createFaq,
  deleteFaq,
  updateFaq,
} = require("./../controllers/faqController");

const router = express.Router();

router.get("/get-faqs", getFaqs);
router.get("/get-faq/:faqId", getFaq);
router.post("/create-faq", createFaq);
router.delete("/delete-faqs", deleteFaqs);
router.delete("/delete-faq/:id", deleteFaq);
router.patch("/update-faq/:id", updateFaq);

module.exports = router;
