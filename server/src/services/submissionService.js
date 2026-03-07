const Submission = require("../models/Submission");

async function createContactSubmission(payload) {
  return Submission.create({
    formType: "contact",
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    subject: payload.subject,
    message: payload.message
  });
}

async function createJoinUsSubmission(payload) {
  return Submission.create({
    formType: "join-us",
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    city: payload.city,
    interest: payload.interest,
    experience: payload.experience,
    message: payload.message
  });
}

async function createDonationSubmission(payload) {
  return Submission.create({
    formType: "donation",
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    amount: payload.amount,
    purpose: payload.purpose,
    message: payload.message
  });
}

async function getSubmissions(formType) {
  const query = formType ? { formType } : {};
  return Submission.find(query).sort({ createdAt: -1 }).lean();
}

module.exports = {
  createContactSubmission,
  createJoinUsSubmission,
  createDonationSubmission,
  getSubmissions
};
