const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    regoNo: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
    },
    middleName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    make: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "",
    },
    body: {
      type: String,
      default: "",
    },
    insurance: {
      type: String,
      default: "",
    },
    year: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    suburb: {
      type: String,
      default: "",
    },
    post: {
      type: String,
      default: "",
    },
    packagePrice: {
      type: String,
      default: "",
    },
    policyType: {
      type: String,
      default: "",
    },
    package: {
      type: String,
      default: "",
    },
    dFName1: {
      type: String,
      default: "",
    },
    dLName1: {
      type: String,
      default: "",
    },
    dFName2: {
      type: String,
      default: "",
    },
    dLname2: {
      type: String,
      default: "",
    },
    discount: {
      type: String,
      default: "",
    },
    reason: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("lead", leadSchema);
