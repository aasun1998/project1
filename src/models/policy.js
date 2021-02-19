const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    policyName: {
      type: String,
      default: "",
    },
    policyMonth: {
      type: String,
      default: "",
    },
    policyType: {
      type: String,
      default: "",
    },
    packageName: {
      type: String,
      default: "",
    },
    excess: {
      type: String,
      default: "",
    },
    pPrice: {
      type: String,
      default: "",
    },
    policyDetail: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("policy", policySchema);
