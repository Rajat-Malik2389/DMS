const express = require("express");
const submissionController = require("../controllers/submissionController");
const asyncHandler = require("../middleware/asyncHandler");
const validateBody = require("../middleware/validateBody");
const {
  contactSubmissionRules,
  donationSubmissionRules,
  joinUsSubmissionRules
} = require("../validators/submissionValidators");

const router = express.Router();

router.post(
  "/forms/contact",
  validateBody(contactSubmissionRules),
  asyncHandler(submissionController.createContactSubmission)
);

router.post(
  "/forms/join-us",
  validateBody(joinUsSubmissionRules),
  asyncHandler(submissionController.createJoinUsSubmission)
);

router.post(
  "/forms/donation",
  validateBody(donationSubmissionRules),
  asyncHandler(submissionController.createDonationSubmission)
);

router.get("/submissions", asyncHandler(submissionController.getSubmissions));

module.exports = router;
