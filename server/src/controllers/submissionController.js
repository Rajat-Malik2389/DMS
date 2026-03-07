const submissionService = require("../services/submissionService");

async function createContactSubmission(req, res) {
  const submission = await submissionService.createContactSubmission(req.body);

  res.status(201).json({
    message: "Contact form submitted successfully.",
    id: submission._id
  });
}

async function createJoinUsSubmission(req, res) {
  const submission = await submissionService.createJoinUsSubmission(req.body);

  res.status(201).json({
    message: "Join us form submitted successfully.",
    id: submission._id
  });
}

async function createDonationSubmission(req, res) {
  const submission = await submissionService.createDonationSubmission(req.body);

  res.status(201).json({
    message: "Donation form submitted successfully.",
    id: submission._id
  });
}

async function getSubmissions(req, res) {
  const submissions = await submissionService.getSubmissions(req.query.formType);
  res.json(submissions);
}

module.exports = {
  createContactSubmission,
  createJoinUsSubmission,
  createDonationSubmission,
  getSubmissions
};
