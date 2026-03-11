const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      enum: ["contact", "join-us", "donation", "ngo-contact", "talent-show"],
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
    stageName: {
      type: String,
      trim: true,
      default: ""
    },
    gender: {
      type: String,
      trim: true,
      default: ""
    },
    age: {
      type: String,
      trim: true,
      default: ""
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
    talentCategory: {
      type: String,
      trim: true,
      default: ""
    },
    languagePreference: {
      type: String,
      trim: true,
      default: ""
    },
    videoLink: {
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
    helpType: {
      type: String,
      trim: true,
      default: ""
    },
    message: {
      type: String,
      trim: true,
      default: ""
    },
    shortIntroduction: {
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
