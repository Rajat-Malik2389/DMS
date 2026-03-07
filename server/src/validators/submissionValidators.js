const contactSubmissionRules = [
  { field: "name", required: true },
  { field: "email", required: true },
  { field: "phone", required: true },
  { field: "subject", required: true },
  { field: "message", required: true }
];

const joinUsSubmissionRules = [
  { field: "name", required: true },
  { field: "email", required: true },
  { field: "phone", required: true },
  { field: "city", required: true },
  { field: "interest", required: true }
];

const donationSubmissionRules = [
  { field: "name", required: true },
  { field: "email", required: true },
  { field: "phone", required: true },
  { field: "amount", required: true },
  { field: "purpose", required: true }
];

module.exports = {
  contactSubmissionRules,
  joinUsSubmissionRules,
  donationSubmissionRules
};
