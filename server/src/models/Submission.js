const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      enum: ["contact", "join-us", "donation"],
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    subject: {
      type: String,
      trim: true,
      default: ""
    },
    city: {
      type: String,
      trim: true,
      default: ""
    },
    interest: {
      type: String,
      trim: true,
      default: ""
    },
    experience: {
      type: String,
      trim: true,
      default: ""
    },
    amount: {
      type: String,
      trim: true,
      default: ""
    },
    purpose: {
      type: String,
      trim: true,
      default: ""
    },
    message: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Submission || mongoose.model("Submission", submissionSchema);
