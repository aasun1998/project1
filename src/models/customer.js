const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    pdf: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    type: {
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
    email: {
      type: String,
      default: "",
      requird: true,
    },
    password: {
      type: String,
      default: "",
      requird: true,
    },
    phone: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: true,
    },
    resetToken: String,
    expireToken: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerSchema);
