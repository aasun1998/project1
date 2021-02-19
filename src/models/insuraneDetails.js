const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const insuranceSchema = new mongoose.Schema(
  {
    policyNo: {
      type: String,
      default: "",
    },
    policyType: {
      type: String,
      default: "",
    },
    overdue: {
      type: String,
      default: "",
    },
    pdf: {
      type: String,
      default: "",
    },
    insuranceType: {
      type: String,
      default: "",
    },
    premium: {
      type: String,
      default: "",
    },
    excess: {
      type: String,
      default: "",
    },
    period: {
      type: String,
      default: "",
    },
    startDate: {
      type: String,
      default: "",
    },
    endDate: {
      type: String,
      default: "",
    },
    nextPaymentDue: {
      type: String,
      default: "",
    },
    discount: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: true,
    },
    reason: {
      type: String,
      default: "",
    },
    package: {
      type: String,
      default: "",
    },
    cardNo: {
      type: String,
      default: "",
    },
    validity: {
      type: String,
      default: "",
    },
    customerId: {
      type: ObjectId,
      ref: "customers",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("insuranceDetails", insuranceSchema);
